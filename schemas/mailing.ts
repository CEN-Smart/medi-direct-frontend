import { z } from 'zod/v4';

export const sendMailSchema = z.object({
    email: z
        .email({
            error: (issue) =>
                issue.input === undefined ? 'Email is required' : undefined,
        })
        .trim(),
});

export const confirmMailSchema = z.object({
    email: z
        .email({
            error: (issue) =>
                issue.input === undefined ? 'Email is required' : undefined,
        })
        .trim(),
    token: z
        .string({
            error: (issue) =>
                issue.input === undefined ? 'Token is required' : undefined,
        })
        .trim()
        .min(6, {
            error: 'Token must be at least 6 characters long',
        })
        .max(6, {
            error: 'Token must be at most 6 characters long',
        }),
});

export const resetPasswordSchema = z.object({
    // email, token and new_password are required for resetting password
    email: z
        .email({
            error: (issue) =>
                issue.input === undefined ? 'Email is required' : undefined,
        })
        .trim(),
    token: z
        .string({
            error: (issue) =>
                issue.input === undefined ? 'Token is required' : undefined,
        })
        .trim()
        .min(6, {
            error: 'Token must be at least 6 characters long',
        })
        .max(6, {
            error: 'Token must be at most 6 characters long',
        }),
    newPassword: z
        .string({
            error: (issue) =>
                issue.input === undefined
                    ? 'New password is required'
                    : undefined,
        })
        .trim()
        .min(8, {
            error: 'New password must be at least 8 characters long',
        })
        .max(100, {
            error: 'New password must be at most 100 characters long',
        }),
});

export const registrationCodeSchema = z.object({
    code: z
        .string({
            error: (issue) =>
                issue.input === undefined ? 'Code is required' : undefined,
        })
        .min(1, 'Code is required'),
});
export type RegistrationCode = z.infer<typeof registrationCodeSchema>;

export type SendMail = z.infer<typeof sendMailSchema>;
export type ConfirmMail = z.infer<typeof confirmMailSchema>;
export type ResetPassword = z.infer<typeof resetPasswordSchema>;
