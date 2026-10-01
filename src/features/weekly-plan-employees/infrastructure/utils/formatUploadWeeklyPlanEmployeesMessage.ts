import type { UploadWeeklyPlanEmployeesResponse } from "@/features/weekly-plan-employees/weekly-plan-employees";

export const formatUploadWeeklyPlanEmployeesMessage = ({ message, data }: UploadWeeklyPlanEmployeesResponse): string =>
    `${message}: ${data.created} ${data.created === 1 ? 'asignación creada' : 'asignaciones creadas'}`;
