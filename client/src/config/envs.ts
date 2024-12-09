import { z } from "zod";

const envSchema = z.object({
  BACKEND_URL: z.string().min(1, { message: "BackendUrl is required" }),
  // DATABASE_URL: z.string().min(1, { message: "DatabaseUrl is required" }),
  // PORT: z.string().min(1, { message: "Port is required" }).transform(Number),
});

const envs = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  // Add other environment variables here
  // DATABASE_URL: process.env.DATABASE_URL,
  // PORT: process.env.PORT,
};

const parsedEnvs = envSchema.parse(envs);

export { parsedEnvs as envs };
