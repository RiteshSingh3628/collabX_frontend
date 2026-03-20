import { z } from "zod";

export const brandRegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(40, "First name is too long"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(40, "Last name is too long"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const DEFAULT_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};