import type { PerformanceRecordCaptureBlocker } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type CaptureState = {
    status: number;
    lineName: string;
    isPalletLine: boolean | null;
    inputFieldsCount: number;
}

export function getCaptureBlocker({ status, lineName, isPalletLine, inputFieldsCount }: CaptureState, action: 'register' | 'edit'): PerformanceRecordCaptureBlocker | null {
    if (status !== 4) return {
        title: 'La tarea no está en progreso',
        message: action === 'register'
            ? 'Solo se registran tarimas mientras la tarea está en progreso.'
            : 'Las tarimas solo se corrigen mientras la tarea está en progreso.'
    };

    if (isPalletLine === false) return {
        title: 'La línea no captura por tarima',
        message: `La línea ${lineName} registra su producción con otra familia de captura.`
    };

    if (inputFieldsCount === 0) return {
        title: 'Línea sin campos configurados',
        message: `Configura los campos de captura de la línea ${lineName} para registrar tarimas.`
    };

    return null;
}
