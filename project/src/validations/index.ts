import { z } from "zod";

export const PatientFormValidation = z.object({
  username: z
    .string()
    .min(10, { message: "User name must be above 10 characters" })
    .max(16, { message: "User name must be under 16 characters" }),
  email: z.string().email(),

  phone: z
    .string()
    .refine((phone) => /^\+\d{11,15}$/.test(phone), "Invalid phone number"),
});
