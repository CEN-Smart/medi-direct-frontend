import { z } from 'zod';

export const contactUsSchema = z.object({
    firstName: z.string({ required_error: 'First name is required' }),
    lastName: z.string({ required_error: 'Last name is required' }),
    email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    subject: z.string({ required_error: 'Subject is required' }),
    message: z
        .string()
        .min(10, { message: 'Message must be at least 10 characters long' }),
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
});

export type ContactUs = z.infer<typeof contactUsSchema>;
