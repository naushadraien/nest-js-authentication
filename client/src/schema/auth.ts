import { z } from "zod";

export const SignUpFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name should be string",
    })
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be string",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password should be string",
    })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    })
    .trim(),
});
