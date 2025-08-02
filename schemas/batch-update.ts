import { z } from 'zod';

// Personal Information Schema
const personalInfoSchema = z.object({
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

export type PersonalInfo = z.infer<typeof personalInfoSchema>;

export { personalInfoSchema };
