"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Sign in</h1>

      <button
        onClick={() => signIn("google")}
        className="block mb-2 px-4 py-2 bg-red-500 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
