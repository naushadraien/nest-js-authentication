import { envs } from "@/config/envs";
import { getSession } from "@/lib/session";
import React from "react";

export default async function ProfilePage() {
  const session = await getSession();
  const response = await fetch(`${envs.BACKEND_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const user = await response.json();
  return <div>{user?.name}</div>;
}
