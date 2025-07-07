import { z } from "zod";

export const sendMailSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    })
    .trim(),
});

export const confirmMailSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    })
    .trim(),
  token: z
    .string({
      required_error: "Token is required",
    })
    .trim()
    .min(6, { message: "Token must be at least 6 characters long" })
    .max(6, { message: "Token must be at most 6 characters long" }),
});

export const resetPasswordSchema = z.object({
  // email, token and new_password are required for resetting password
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    })
    .trim(),
  token: z
    .string({
      required_error: "Token is required",
    })
    .trim()
    .min(6, { message: "Token must be at least 6 characters long" })
    .max(6, { message: "Token must be at most 6 characters long" }),
  newPassword: z
    .string({
      required_error: "New password is required",
    })
    .trim()
    .min(8, { message: "New password must be at least 8 characters long" })
    .max(100, { message: "New password must be at most 100 characters long" }),
});

export const registrationCodeSchema = z.object({
  code: z
    .string({
      required_error: "Code is required",
    })
    .min(1, "Code is required"),
});
export type RegistrationCode = z.infer<typeof registrationCodeSchema>;

export type SendMail = z.infer<typeof sendMailSchema>;
export type ConfirmMail = z.infer<typeof confirmMailSchema>;
export type ResetPassword = z.infer<typeof resetPasswordSchema>;
