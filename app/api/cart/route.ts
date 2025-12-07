import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ status: 500 });
  }
  const carts = await prisma.cart.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(carts);
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items = body.items ?? [];
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ status: 500 });
    }
    await prisma.cart.upsert({
      where: { userId: session.user.id },
      update: { items: items },
      create: { userId: session.user.id, items: items },
    });
    return NextResponse.json({ message: "Save Item cart successfully" });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const session = await auth();
  const projectId = searchParams.get("id");
  if (!projectId)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  if (!session?.user?.id) {
    return NextResponse.json({ status: 500 });
  }
  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
  });

  if (!cart) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }
  if (!Array.isArray(cart.items)) {
    await prisma.cart.delete({ where: { userId: session.user.id } });
  } else {
    const cartsNew = cart.items.filter((f: any) => f.id !== projectId);
    if (!cartsNew.length) {
      await prisma.cart.delete({ where: { userId: session.user.id } });
    } else {
      await prisma.cart.update({
        where: { userId: session.user.id },
        data: { items: cartsNew },
      });
    }
  }
  return NextResponse.json({ message: "Deleted successfully" });
}
