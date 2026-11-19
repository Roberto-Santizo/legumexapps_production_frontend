import type { ConfirmWeeklyPlanTaskEmployeesByPositionForm, WeeklyPlanEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export const buildConfirmByPositionBody = (candidates: WeeklyPlanEmployee[]): ConfirmWeeklyPlanTaskEmployeesByPositionForm => ({
    employees: candidates.map(({ code, name, position }) => ({ code, name, position })),
});

export const formatEmployeeCount = (count: number): string =>
    `${count} ${count === 1 ? 'candidato' : 'candidatos'}`;

export const getConfirmByPositionQuestion = (count: number) => ({
    title: '¿Confirmar a todos los candidatos por su posición?',
    description: `Se asignarán ${formatEmployeeCount(count)} de la línea tal como vienen del biométrico, cada uno a la actividad de su posición. La tarea pasará a lista para ejecución y no se puede deshacer.`,
});

export const getConfirmByPositionBlockReason = (count: number, isLoading: boolean): string | null => {
    if (isLoading) return 'Cargando candidatos de la línea';
    if (count === 0) return 'La línea no tiene candidatos para confirmar';

    return null;
};
