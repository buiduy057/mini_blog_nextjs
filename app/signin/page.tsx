"use server";
import { auth } from "@/auth";
import SingInButton from "@/components/sing-in-button";
export default async function SignInPage() {
  const session = await auth();
  console.log("session", session);
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Sign in</h1>
      <SingInButton />
    </div>
  );
}
