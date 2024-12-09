"use server";

import { envs } from "@/config/envs";
import { SignUpFormSchema } from "@/schema/auth";
import { FormPreviousState } from "@/types";
import { redirect } from "next/navigation";

export async function signUp(
  previousState: FormPreviousState,
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
    },
    body: JSON.stringify(validationFields.data),
  });
  if (response.ok) {
    redirect("/");
  } else {
    return {
      message:
        response.status === 409 ? "User already exists!" : response.statusText,
    };
  }
}
