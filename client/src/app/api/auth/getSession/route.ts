import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tokens = await getSession();

  return NextResponse.json(tokens);
}
