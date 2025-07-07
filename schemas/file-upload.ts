import { z } from "zod";

export const imageUploadSchema = z.object({
  files: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB",
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      "Only JPEG, PNG, and GIF files are allowed",
    ),
});

export type ImageUpload = z.infer<typeof imageUploadSchema>;
