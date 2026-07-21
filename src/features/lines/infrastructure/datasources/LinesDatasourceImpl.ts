import { PaginatedLinesSchema, type Line, type LineForm, type LinesDatasource, type PaginatedLines } from "@/features/lines/lines";
import { isAxiosError, type AxiosInstance } from "axios";

export class LinesDatasourceImpl implements LinesDatasource {
    constructor(private api: AxiosInstance, private url = '/lines') {}

    createLine(payload: LineForm): Promise<string> {
        throw new Error('Method not implemented.');
    }

    async getLines(limit: string, page: string): Promise<PaginatedLines> {
        try {
            const url = `${this.url}?limit=${limit}&page=${page}`
            const { data } = await this.api.get(url);
            const response = PaginatedLinesSchema.safeParse(data);

            if(response.success){
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if(isAxiosError(error)) throw new Error(error.response?.data.message);
            
            throw new Error("Error no controlado");
        }
    }

    getLineByCode(code: string): Promise<Line> {
        throw new Error('Method not implemented.');
    }

    updateLineByCode(code: string, payload: LineForm): Promise<string> {
        throw new Error('Method not implemented.');
    }
    
    delete(code: string): Promise<string> {
        throw new Error('Method not implemented.');
    }

}