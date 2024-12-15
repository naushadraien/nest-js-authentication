import { z } from "zod";

const envSchema = z.object({
  BACKEND_URL: z
    .string({ message: "Backend Url is required" })
    .min(1, { message: "BackendUrl must be at least 1 character" }),
  // DATABASE_URL: z.string().min(1, { message: "DatabaseUrl is required" }),
  // PORT: z.string().min(1, { message: "Port is required" }).transform(Number),
  SESSION_SECRET_KEY: z
    .string({ message: "Session secret key is required" })
    .min(4, { message: "Session key must be at least 4 characters" }),
});

const envs = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  // Add other environment variables here
  // DATABASE_URL: process.env.DATABASE_URL,
  // PORT: process.env.PORT,
  SESSION_SECRET_KEY: process.env.NEXT_PUBLIC_SESSION_SECRET,
};

const parsedEnvs = envSchema.parse(envs);

export { parsedEnvs as envs };
