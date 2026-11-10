import { AssistantErrorResponseSchema } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

export const ASSISTANT_REQUEST_ERROR = 'No se pudo enviar la pregunta';
export const ASSISTANT_STREAM_ERROR = 'No se pudo generar la respuesta, intenta de nuevo';

export class AssistantRequestError extends Error {
    constructor(message: string, public status: number) {
        super(message);
        this.name = 'AssistantRequestError';
    }
}

export const parseAssistantRequestError = async (response: Response): Promise<AssistantRequestError> => {
    const body = await response.json().catch(() => null);
    const parsed = AssistantErrorResponseSchema.safeParse(body);
    const message = parsed.success && parsed.data.message ? parsed.data.message : ASSISTANT_REQUEST_ERROR;

    return new AssistantRequestError(message, response.status);
}

export const getAssistantErrorMessage = (error: Error): string => {
    if (error instanceof AssistantRequestError) return error.message;

    return ASSISTANT_STREAM_ERROR;
}
