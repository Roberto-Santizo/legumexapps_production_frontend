import { z } from "zod";

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    role: z.string()
});
