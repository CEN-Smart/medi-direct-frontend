import { z } from 'zod/v4';

export const contactUsSchema = z.object({
    firstName: z.string({
        error: (issue) =>
            issue.input === undefined ? 'First name is required' : undefined,
    }),
    lastName: z.string({
        error: (issue) =>
            issue.input === undefined ? 'Last name is required' : undefined,
    }),
    email: z.email({
        error: (issue) =>
            issue.input === undefined ? 'Email is required' : undefined,
    }),
    subject: z.string({
        error: (issue) =>
            issue.input === undefined ? 'Subject is required' : undefined,
    }),
    message: z.string().min(10, {
        error: 'Message must be at least 10 characters long',
    }),
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
});

export type ContactUs = z.infer<typeof contactUsSchema>;
