"use server";
import Link from "next/link";
export default async function Home() {
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
