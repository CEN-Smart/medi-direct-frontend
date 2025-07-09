import { z } from 'zod';

export const serviceTypeSchema = z.object({
    name: z
        .string({ required_error: 'Name is required' })
        .min(1, 'Name cannot be empty'),
    description: z.string().optional(),
});

export type ServiceType = z.infer<typeof serviceTypeSchema>;
