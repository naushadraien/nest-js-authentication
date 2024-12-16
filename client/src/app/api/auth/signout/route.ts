import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  console.log("hello from server");

  await deleteSession();
  return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
}
