import { ApiResponseSchema } from "@/features/shared/shared";
import { z } from "zod";

export const UploadWeeklyPlanEmployeesResponseSchema = ApiResponseSchema.extend({
    data: z.object({
        created: z.number()
    })
});
