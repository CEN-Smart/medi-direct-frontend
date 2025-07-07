import { z } from "zod";

const envVariables = z.object({
  NEXT_PUBLIC_DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_APP_SECRET: z.string(),
});

envVariables.parse(process.env);
