import { LineDependencySchema } from "@/features/line-dependencies/line-dependencies";
import type { z } from "zod";

export type LineDependancy = z.infer<typeof LineDependencySchema>;

export type LineDependencyForm = {
    line_id: number;
    line_dependent_id: number;
}