import { z } from 'zod';

export const signUpSchema = z.object({
    firstName: z
        .string({
            required_error: 'First name is required',
        })
        .min(2, {
            message: 'First name must be at least 2 characters long',
        })
        .max(100, {
            message: 'First name must be at most 100 characters long',
        })
        .trim(),
    lastName: z
        .string({
            required_error: 'Last name is required',
        })
        .min(2, {
            message: 'Last name must be at least 2 characters long',
        })
        .max(100, {
            message: 'Last name must be at most 100 characters long',
        })
        .trim(),
    email: z
        .string({
            required_error: 'Email is required',
        })
        .email({
            message: 'Invalid email address',
        })
        .trim(),
    password: z
        .string({
            required_error: 'Password is required',
        })
        .min(8, {
            message: 'Password must be at least 8 characters long',
        })
        .max(100, {
            message: 'Password must be at most 100 characters long',
        })
        .trim(),
    phone: z
        .string({
            required_error: 'Phone number is required',
        })
        .trim()
        .regex(/^\+\d{1,3}\d{10}$/, {
            message:
                'Invalid phone number format, must be in the format +234XXXXXXXXXX',
        })
        .refine(
            (value) => (value.startsWith('+234') ? value.length === 14 : true),
            {
                message:
                    'Invalid phone number format, must be in the format +234XXXXXXXXXX',
            },
        ),
    agreedToTerms: z
        .boolean({
            required_error: 'You must agree to the terms and conditions',
        })
        .refine((value) => value === true, {
            message: 'You must agree to the terms and conditions',
        }),
});
export type SignUp = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required',
        })
        .email({
            message: 'Invalid email address',
        })
        .trim(),
    password: z
        .string({
            required_error: 'Password is required',
        })
        .min(8, {
            message: 'Password must be at least 8 characters long',
        })
        .max(100, {
            message: 'Password must be at most 100 characters long',
        })
        .trim(),
});

export type LoginData = z.infer<typeof loginSchema>;

export const updatePasswordSchema = z
    .object({
        currentPassword: z
            .string({ required_error: 'Current password is required' })
            .min(8)
            .max(100),
        newPassword: z
            .string({ required_error: 'New password is required' })
            .min(8)
            .max(100),
        confirmPassword: z
            .string({ required_error: 'Confirm password is required' })
            .min(8)
            .max(100)
            .optional(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    });

export type UpdatePassword = z.infer<typeof updatePasswordSchema>;
