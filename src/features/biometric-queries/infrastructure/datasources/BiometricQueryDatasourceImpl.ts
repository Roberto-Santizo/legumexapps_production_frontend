import { isAxiosError, type AxiosInstance } from "axios";
import { z } from "zod";
import { BiometricEmployeeSchema, type BiometricEmployee, type BiometricQueryDatasource } from "@/features/biometric-queries/biometric-queries";

export class BiometricQueryDatasourceImpl implements BiometricQueryDatasource {
    constructor(
        private api: AxiosInstance,
        private url = '/biometric-queries'
    ) { }

    async getEmployeesByLineCode(lineCode: string): Promise<BiometricEmployee[]> {
        try {
            const url = `${this.url}/employeesByLineCode/${lineCode}`;
            const { data } = await this.api.get(url);
            const response = z.array(BiometricEmployeeSchema).safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }
}
