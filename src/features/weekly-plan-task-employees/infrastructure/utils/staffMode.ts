import type { StaffMode } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

const STAFF_MODE_DESCRIPTIONS: Record<number, string> = {
    1: 'El personal se podrá confirmar cuando se entregue el material de empaque.',
    2: 'Revisa a los candidatos de la línea, marca reemplazos, bajas o altas y confirma. La confirmación se hace una sola vez.',
    3: 'Agrega, reemplaza o quita empleados mientras la tarea esté lista para ejecución.',
    4: 'Agrega, reemplaza o quita empleados mientras la tarea esté en progreso.',
    5: 'La tarea finalizó. El personal queda solo para consulta.',
};

export const getStaffMode = (status: number): StaffMode => {
    if (status === 2) return 'confirm';
    if (status === 3 || status === 4) return 'edit';

    return 'readonly';
};

export const getStaffModeDescription = (status: number): string => STAFF_MODE_DESCRIPTIONS[status] ?? '';

export const splitErrorMessages = (message: string): string[] =>
    message.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
