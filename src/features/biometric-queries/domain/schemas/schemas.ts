import { z } from "zod";

export const BiometricEmployeeSchema = z.object({
    id: z.coerce.string(),
    name: z.string(),
    code: z.string(),
    position: z.string().nullish().transform((position) => position ?? ''),
});
