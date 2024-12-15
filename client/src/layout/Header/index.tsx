import SignInButton from "@/components/ui/signInButton";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="p-2 shadow flex gap-3 bg-gradient-to-br from-blue-400 to-cyan-400 text-black">
      <Link href={"/"}>Home</Link>
      <Link href={"/dashboard"}>Dashboard</Link>
      <Link href={"/profile"}>Profile</Link>
      <SignInButton />
    </header>
  );
}
