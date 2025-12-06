"use client";
import { signIn } from "next-auth/react";
import React from "react";

function SingInButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="block mb-2 px-4 py-2 bg-red-500 text-white rounded"
    >
      Sign in with Google
    </button>
  );
}

export default SingInButton;
