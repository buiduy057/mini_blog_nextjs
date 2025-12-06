"use server";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
export default async function Home() {
  const session = await auth();
  const dbUser = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });
  console.log("session", session, "dbUser", dbUser);
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">Welcome to Mini Blog</h1>
      <p>Learn Next.js App Router, Server & Client Components</p>
      <Link href="/posts" className="text-blue-500 hover:underline">
        View Posts
      </Link>
    </div>
  );
}
