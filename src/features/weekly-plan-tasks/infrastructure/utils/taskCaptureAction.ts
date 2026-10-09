import type { CaptureType } from "@/features/capture-fields/capture-fields";

type TaskCaptureAction = {
    label: string;
    queryParam: string;
}

export const getTaskCaptureAction = (captureType: CaptureType | undefined): TaskCaptureAction =>
    captureType === 'lot'
        ? { label: 'Registrar Lote', queryParam: 'taskLots' }
        : { label: 'Rendimiento', queryParam: 'taskPerformance' };

export const getRecordedPoundsLabel = (captureType: CaptureType | undefined): string =>
    captureType === 'lot' ? 'Libras recortadas' : 'Libras registradas';
