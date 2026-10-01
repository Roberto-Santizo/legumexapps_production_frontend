import type { BulkUploadColumn } from "@/features/shared/shared";

export const weeklyPlanEmployeeBulkUploadColumns: BulkUploadColumn[] = [
    { header: "Código", description: "Código del empleado, en formato texto" },
    { header: "Posición", description: "Código de una posición existente" },
    { header: "Semana", description: "Semana del plan semanal" },
    { header: "Year", description: "Año del plan semanal" },
];
