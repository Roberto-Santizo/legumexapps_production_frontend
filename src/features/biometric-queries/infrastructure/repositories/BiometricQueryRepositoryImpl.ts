import type { BiometricEmployee, BiometricQueryDatasource, BiometricQueryRepository } from "@/features/biometric-queries/biometric-queries";

export class BiometricQueryRepositoryImpl implements BiometricQueryRepository {
    constructor(private datasource: BiometricQueryDatasource) { }

    getEmployeesByLineCode(lineCode: string): Promise<BiometricEmployee[]> {
        return this.datasource.getEmployeesByLineCode(lineCode);
    }
}
