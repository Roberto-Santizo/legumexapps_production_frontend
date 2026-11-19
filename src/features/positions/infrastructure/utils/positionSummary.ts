import type { BulkUploadColumn } from "@/features/shared/shared";
import type { Position } from "@/features/positions/positions";

export const countActivePositions = (positions: Position[]): number =>
    positions.filter(position => position.status).length;

export const positionsSummaryLabel = (count: number, active: number): string =>
    `${count} ${count === 1 ? 'posición' : 'posiciones'} · ${active} ${active === 1 ? 'activa' : 'activas'}`;

export const positionBulkUploadColumns: BulkUploadColumn[] = [
    { header: "Código", description: "Código único del puesto" },
    { header: "Actividad", description: "Nombre de una actividad del catálogo asignada a la línea" },
    { header: "Línea", description: "Código de una línea existente" },
];
