import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  console.log("🚀 ~ GET ~ req:", req.url);
  const { searchParams } = new URL(req.url);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");

  if (!accessToken || !refreshToken || !userId || !name)
    throw new Error("Google Oauth failed");

  await createSession({
    accessToken,
    refreshToken,
    user: {
      id: userId,
      name,
    },
  });
  return redirect("/");
}
