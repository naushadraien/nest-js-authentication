"use server";

import { envs } from "@/config/envs";
import { createSession } from "@/lib/session";
import { SignInFormSchema, SignUpFormSchema } from "@/schema/auth";
import { FormPreviousState } from "@/types";
import { redirect } from "next/navigation";

export async function signUp(
  state: FormPreviousState,
  formData: FormData
): Promise<FormPreviousState> {
  const validationFields = SignUpFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${envs.BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // origin: "http://localhost:3000",
    },
    body: JSON.stringify(validationFields.data),
  });
  if (response.ok) {
    redirect("/auth/signin");
  } else {
    return {
      message:
        response.status === 409 ? "User already exists!" : response.statusText,
    };
  }
}
export async function signIn(
  state: FormPreviousState,
  formData: FormData
): Promise<FormPreviousState> {
  const validationFields = SignInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${envs.BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });
  if (response.ok) {
    const data = await response.json();
    await createSession({
      user: {
        id: data.id,
        name: data.name,
      },
      accessToken: data.accessToken,
    });
    redirect("/");
  } else {
    return {
      message:
        response.status === 401 ? "Invalid Credentials!" : response.statusText,
    };
  }
}
