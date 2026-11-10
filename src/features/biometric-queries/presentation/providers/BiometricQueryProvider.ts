import type { BiometricEmployee, BiometricQueryRepository } from "@/features/biometric-queries/biometric-queries";
import { BiometricQueryDatasourceImpl, BiometricQueryRepositoryImpl } from "@/features/biometric-queries/infrastructure/infrastructure";
import api from "@/config/http/axios";

export class BiometricQueryProvider {
    constructor(private repository: BiometricQueryRepository) { }

    getEmployeesByLineCode(lineCode: string): Promise<BiometricEmployee[]> {
        return this.repository.getEmployeesByLineCode(lineCode);
    }
}

const datasource = new BiometricQueryDatasourceImpl(api);
const repository = new BiometricQueryRepositoryImpl(datasource);
export const biometricQueryProvider = new BiometricQueryProvider(repository);
