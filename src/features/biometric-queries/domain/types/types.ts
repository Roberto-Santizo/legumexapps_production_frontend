import { BiometricEmployeeSchema } from "@/features/biometric-queries/biometric-queries";
import type { z } from "zod";

export type BiometricEmployee = z.infer<typeof BiometricEmployeeSchema>;
