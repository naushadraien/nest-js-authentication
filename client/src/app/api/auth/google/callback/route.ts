import { createSession } from "@/lib/session";
import { Role } from "@/types";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  console.log("🚀 ~ GET ~ req:", req.url);
  const { searchParams } = new URL(req.url);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");
  const role = searchParams.get("role");

  if (!accessToken || !refreshToken || !userId || !name || !role)
    throw new Error("Google Oauth failed");

  await createSession({
    accessToken,
    refreshToken,
    user: {
      id: userId,
      name,
      role: role as Role,
    },
  });
  return redirect("/");
}
