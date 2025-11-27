import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // redirect to sign in page (server-side)
    redirect("/signin");
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl">Dashboard</h1>
      <p>Welcome, {session.user?.name ?? session.user?.email}</p>
      {/* Nội dung protected */}
    </div>
  );
}
