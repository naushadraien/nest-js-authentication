"use client";
import React from "react";
import { Button } from "./button";
import { deleteSession } from "@/lib/session";
import { useRouter } from "next/navigation";

export default function SignOutBtn() {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await deleteSession();
        router.push("/auth/signin");
      }}
    >
      Sign Out
    </Button>
  );
}
