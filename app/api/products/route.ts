import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/products
export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

// POST /api/products
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, description, price } = body;
  if (!name || !price) {
    return NextResponse.json(
      { error: "Name and price are required" },
      { status: 400 }
    );
  }
  const product = await prisma.product.create({
    data: { name, description, price },
  });
  return NextResponse.json(product);
}

// PUT /api/products?id=xxx
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();
  const { name, description, price } = body;

  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const updated = await prisma.product.update({
    where: { id },
    data: { name, description, price },
  });
  return NextResponse.json(updated);
}

// DELETE /api/products?id=xxx
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted successfully" });
}
