import type { CaptureType } from "@/features/capture-fields/capture-fields";

type TaskCaptureAction = {
    label: string;
    queryParam: string;
}

const TASK_CAPTURE_ACTIONS: Record<CaptureType, TaskCaptureAction> = {
    pallet: { label: 'Rendimiento', queryParam: 'taskPerformance' },
    lot: { label: 'Registrar Lote', queryParam: 'taskLots' },
    product: { label: 'Registrar Producto', queryParam: 'taskProducts' }
};

export const getTaskCaptureAction = (captureType: CaptureType | undefined): TaskCaptureAction =>
    TASK_CAPTURE_ACTIONS[captureType ?? 'pallet'];

export const getRecordedPoundsLabel = (captureType: CaptureType | undefined): string =>
    captureType === 'lot' || captureType === 'product' ? 'Libras recortadas' : 'Libras registradas';
