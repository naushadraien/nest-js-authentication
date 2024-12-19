import { getSession } from "@/lib/session";
import React from "react";

export default async function DashboardPage() {
  const session = await getSession();
  console.log("🚀 ~ DashboardPage ~ session:", session);
  return <div>DashboardPage</div>;
}
