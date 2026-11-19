import type { StaffMode } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

const STAFF_MODE_DESCRIPTIONS: Record<number, string> = {
    1: 'El personal se podrá confirmar cuando se entregue el material de empaque.',
    2: 'Arrastra a cada candidato de la línea a la actividad que cubrirá. Desde el mismo tablero puedes reemplazarlo, darlo de baja o sumar altas directo en cada actividad. La confirmación se hace una sola vez.',
    3: 'Arrastra a un empleado a otra actividad para cambiarla, o retíralo, mientras la tarea esté lista para ejecución.',
    4: 'Arrastra a un empleado a otra actividad para cambiarla, o retíralo, mientras la tarea esté en progreso.',
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
