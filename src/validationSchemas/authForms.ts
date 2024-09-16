import z from "zod";
import isEmail from "validator/lib/isEmail";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .refine(isEmail, "Email address in invalid"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/\d/, "Password must contain at least one number"),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long")
      .regex(/\d/, "Confirm Password must contain at least one number"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
