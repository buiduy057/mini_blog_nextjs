"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import MiniCart from "./MiniCart";

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
      <MiniCart />
      <button
        onClick={() =>
          signOut({
            redirectTo: "/",
          })
        }
      >
        Sign out
      </button>
    </aside>
  );
};

export default SiderBar;
