import type { BiometricEmployee } from "@/features/biometric-queries/biometric-queries";

export abstract class BiometricQueryDatasource {
    abstract getEmployeesByLineCode(lineCode: string): Promise<BiometricEmployee[]>;
}
