import type { BiometricEmployee } from "@/features/biometric-queries/biometric-queries";

export abstract class BiometricQueryRepository {
    abstract getEmployeesByLineCode(lineCode: string): Promise<BiometricEmployee[]>;
}
