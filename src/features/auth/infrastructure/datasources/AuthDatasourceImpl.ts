import { AuthDatasource, type LoginForm, BadRequestError, type AuthUser, Unauthorized, AuthUserSchema } from '@/features/auth/auth';
import { isAxiosError, type AxiosInstance } from 'axios';

export class AuthDatasourceImpl implements AuthDatasource {
    constructor(private api: AxiosInstance) { }

    async checkStatus(): Promise<AuthUser> {
        try {
            const url = '/check-status';
            const { data } = await this.api.get(url);
            const response = AuthUserSchema.safeParse(data['data']);
            if (response.success) {
                return response.data;
            }

            throw new Error("Error de validación");
        } catch (error) {
            if (isAxiosError(error)) {
                const status = error.response?.status;
                if (status == 401) throw new Unauthorized('');
            }
            throw new Error("Error no controlado");
        }
    }

    async login(payload: LoginForm): Promise<AuthUser> {
        try {
            const url = '/login';
            const { data } = await this.api.post(url, payload);
            const response = AuthUserSchema.safeParse(data['data']);
            if (response.success) {
                return response.data;
            }

            throw new Error("Error de validación");
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.data.statusCode == 400) throw new BadRequestError(error.response.data.message);
            }
            throw new Error("Error no controlado");
        }
    }
}
