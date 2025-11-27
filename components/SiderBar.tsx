import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const SiderBar = () => {
  const { data: session } = useSession();

  if (!session) return null;
  return (
    <aside className="w-1/4 p-4 border-r">
      <h2 className="font-bold mb-2">Sidebar</h2>
      <ul>
        <li>
          <Link href="/posts">All Posts</Link>
        </li>
        <li>
          <Link href="/product">Product</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
      <span>{session.user?.name}</span>
      <button onClick={() => signOut()}>Sign out</button>
    </aside>
  );
};

export default SiderBar;
