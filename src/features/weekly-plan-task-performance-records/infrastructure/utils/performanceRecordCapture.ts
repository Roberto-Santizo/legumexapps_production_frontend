import type { PerformanceRecordCaptureBlocker, RecordCaptureType } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type CaptureState = {
    captureType: RecordCaptureType;
    status: number;
    lineName: string;
    isCaptureLine: boolean | null;
    inputFieldsCount: number;
}

const CAPTURE_WORDING: Record<RecordCaptureType, { plural: string; article: string; family: string }> = {
    pallet: { plural: 'tarimas', article: 'Las', family: 'por tarima' },
    lot: { plural: 'lotes', article: 'Los', family: 'por lote' }
};

export function getCaptureBlocker({ captureType, status, lineName, isCaptureLine, inputFieldsCount }: CaptureState, action: 'register' | 'edit'): PerformanceRecordCaptureBlocker | null {
    const { plural, article, family } = CAPTURE_WORDING[captureType];

    if (status !== 4) return {
        title: 'La tarea no está en progreso',
        message: action === 'register'
            ? `Solo se registran ${plural} mientras la tarea está en progreso.`
            : `${article} ${plural} solo se corrigen mientras la tarea está en progreso.`
    };

    if (isCaptureLine === false) return {
        title: `La línea no captura ${family}`,
        message: `La línea ${lineName} registra su producción con otra familia de captura.`
    };

    if (inputFieldsCount === 0) return {
        title: 'Línea sin campos configurados',
        message: `Configura los campos de captura de la línea ${lineName} para registrar ${plural}.`
    };

    return null;
}
