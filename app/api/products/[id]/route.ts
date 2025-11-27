import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(req: NextRequest, { params }: any) {
  const id = params.id;

  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  const product = await prisma.product.findUnique({
    where: { id },
  });
  return NextResponse.json({ product });
}
