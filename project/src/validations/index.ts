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
export const PatientRegisterationFormValidation = z.object({
  username: z
    .string()
    .min(10, { message: "User name must be above 10 characters" })
    .max(16, { message: "User name must be under 16 characters" }),
  email: z.string().email(),
  
  phone: z
    .string()
    .refine((phone) => /^\+\d{11,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.string(),
  gender: z.string(),
  address: z.string(),

  occupation: z.string(),
  emergencyContactName: z.string(),
  emergencyContactNumber: z
    .string()
    .refine((phone) => /^\+\d{11,15}$/.test(phone), "Invalid phone number"),
  primaryPhysician: z.string(),
  insuranceProvider: z.string(),
  insurancePolicyNumber: z.string(),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.any().optional(), // Assuming FormData can't be validated directly, this will need custom handling
  privacyConsent: z.boolean(),
});
