"use client";
import { envs } from "@/config/envs";
import authFetch from "@/lib/authFetch";
import { deleteSession } from "@/lib/session";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function SignOutBtn() {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        const res = await authFetch(`${envs.BACKEND_URL}/auth/logout`, {
          method: "POST",
        });
        if (res?.ok) {
          await deleteSession();
        }
        router.push("/auth/signin");
      }}
    >
      Sign Out
    </Button>
  );
}
