import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("log from server");
  return NextResponse.json({ message: "Log from server" });
}
