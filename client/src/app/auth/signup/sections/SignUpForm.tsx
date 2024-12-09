"use client";
import { signUp } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { useActionState } from "react";

const SignUpForm = () => {
  const [error, action, isPending] = useActionState(signUp, null);
  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        {error?.message && (
          <p className="text-sm text-red-500">{error.message}</p>
        )}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="John Doe" />
        </div>
        {error?.error?.name && (
          <p className="text-sm text-red-500">{error.error.name}</p>
        )}

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="john@example.com" />
        </div>
        {error?.error?.email && (
          <p className="text-sm text-red-500">{error.error.email}</p>
        )}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>
        {error?.error?.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
              {error.error.password.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        <SubmitButton>Sign Up</SubmitButton>
      </div>
    </form>
  );
};

export default SignUpForm;
