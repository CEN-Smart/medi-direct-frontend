import { z } from 'zod/v4';

// Personal Information Schema
const personalInfoSchema = z.object({
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

export type PersonalInfo = z.infer<typeof personalInfoSchema>;

export { personalInfoSchema };
