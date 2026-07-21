import { UserSchema } from "@/features/users/users";
import { z } from "zod";

//USER SCHEMA
export const AuthUserSchema = UserSchema.pick({  name: true, role: true }).extend({
    token: z.string(),
    permissions: z.array(z.string())
});
