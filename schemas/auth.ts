import { z } from 'zod/v4';

export const signUpSchema = z.object({
    firstName: z
        .string({
            error: (issue) =>
                issue.input === undefined
                    ? 'First name is required'
                    : undefined,
        })
        .min(2, {
            error: 'First name must be at least 2 characters long',
        })
        .max(100, {
            error: 'First name must be at most 100 characters long',
        })
        .trim(),
    lastName: z
        .string({
            error: (issue) =>
                issue.input === undefined ? 'Last name is required' : undefined,
        })
        .min(2, {
            error: 'Last name must be at least 2 characters long',
        })
        .max(100, {
            error: 'Last name must be at most 100 characters long',
        })
        .trim(),
    email: z
        .email({
            error: (issue) =>
                issue.input === undefined ? 'Email is required' : undefined,
        })
        .trim(),
    password: z
        .string({
            error: (issue) =>
                issue.input === undefined ? 'Password is required' : undefined,
        })
        .min(8, {
            error: 'Password must be at least 8 characters long',
        })
        .max(100, {
            error: 'Password must be at most 100 characters long',
        })
        .trim(),
    phone: z
        .string({
            error: (issue) =>
                issue.input === undefined
                    ? 'Phone number is required'
                    : undefined,
        })
        .trim()
        .regex(/^\+\d{1,3}\d{10}$/, {
            error: 'Invalid phone number format, must be in the format +234XXXXXXXXXX',
        })
        .refine(
            (value) => (value.startsWith('+234') ? value.length === 14 : true),
            {
                error: 'Invalid phone number format, must be in the format +234XXXXXXXXXX',
            },
        ),
    agreedToTerms: z
        .boolean({
            error: (issue) =>
                issue.input === undefined
                    ? 'You must agree to the terms and conditions'
                    : undefined,
        })
        .refine((value) => value === true, {
            error: 'You must agree to the terms and conditions',
        }),
});
export type SignUp = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
    email: z
        .email({
            error: (issue) =>
                issue.input === undefined ? 'Email is required' : undefined,
        })
        .trim(),
    password: z
        .string({
            error: (issue) =>
                issue.input === undefined ? 'Password is required' : undefined,
        })
        .min(8, {
            error: 'Password must be at least 8 characters long',
        })
        .max(100, {
            error: 'Password must be at most 100 characters long',
        })
        .trim(),
});

export type LoginData = z.infer<typeof loginSchema>;

export const updatePasswordSchema = z
    .object({
        currentPassword: z
            .string({
                error: (issue) =>
                    issue.input === undefined
                        ? 'Current password is required'
                        : undefined,
            })
            .min(8)
            .max(100),
        newPassword: z
            .string({
                error: (issue) =>
                    issue.input === undefined
                        ? 'New password is required'
                        : undefined,
            })
            .min(8)
            .max(100),
        confirmPassword: z
            .string({
                error: (issue) =>
                    issue.input === undefined
                        ? 'Confirm password is required'
                        : undefined,
            })
            .min(8)
            .max(100)
            .optional(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ['confirmPassword'],
        error: 'Passwords must match',
    });

export type UpdatePassword = z.infer<typeof updatePasswordSchema>;
