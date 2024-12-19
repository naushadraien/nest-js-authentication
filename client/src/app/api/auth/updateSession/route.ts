import { updateSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accessToken, refreshToken } = body;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { message: "Access token and refresh token are required" },
        { status: 400 }
      );
    }

    await updateSession({ accessToken, refreshToken });
    return NextResponse.json({
      message: "Session Updated Successfully",
    });
  } catch (error) {
    console.error("Error updating session:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
