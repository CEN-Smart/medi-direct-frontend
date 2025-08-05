import { z } from 'zod/v4';

export const serviceTypeSchema = z.object({
    name: z
        .string({
            error: (issue) =>
                issue.input === undefined ? 'Name is required' : undefined,
        })
        .min(1, 'Name cannot be empty'),
    description: z.string().optional(),
});

export type ServiceType = z.infer<typeof serviceTypeSchema>;
