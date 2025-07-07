import { z } from "zod";

// Personal Information Schema
const personalInfoSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  phone_number: z
    .string({ required_error: "Phone number is required" })
    .regex(/^\+\d{1,3}\d{10}$/)
    .refine(
      (value) => (value.startsWith("+234") ? value.length === 14 : true),
      {
        message: "Invalid phone number format",
      },
    ),
  address: z.string({ required_error: "Address is required" }),
  city: z.string({ required_error: "City is required" }),
  state: z.string({ required_error: "State is required" }),
  country: z.string({ required_error: "Country is required" }),
});

// Professional Information Schema
const professionalInfoSchema = z.object({
  bio: z.string().optional(),
  occupation: z.string().optional(),
  place_of_work: z.string().optional(),
  facebook: z.string().url().optional(),
  twitter: z.string().url().optional(),
  instagram: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  tiktok: z.string().url().optional(),
  youtube: z.string().url().optional(),
  whatsapp: z.string().url().optional(),
  telegram: z.string().url().optional(),
  discord: z.string().url().optional(),
  website: z.string().url().optional(),
});

// Profile Picture Schema
const profilePictureSchema = z.object({
  avatar: z
    .string({ required_error: "Avatar URL is required" })
    .url()
    .optional(),
});

// Role
export enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export type RolePayload = "ADMIN" | "USER" | "SUPER_ADMIN";

// Role Schema
export const roleSchema = z.object({
  role: z.nativeEnum(ROLE, {
    required_error: "Role is required",
  }),
});

export type Role = z.infer<typeof roleSchema>;

export type ProfileInfo = z.infer<typeof personalInfoSchema>;

export type ProfessionalInfo = z.infer<typeof professionalInfoSchema>;

export type ProfilePicture = z.infer<typeof profilePictureSchema>;

export { personalInfoSchema, professionalInfoSchema, profilePictureSchema };
