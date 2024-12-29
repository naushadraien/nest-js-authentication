import { getSession } from "@/lib/session";
import { Role } from "@/types";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardPage() {
  const session = await getSession();
  console.log("🚀 ~ DashboardPage ~ session:", session);
  if (session?.user.role !== Role.ADMIN) redirect("/auth/signin");
  return <div>DashboardPage</div>;
}
