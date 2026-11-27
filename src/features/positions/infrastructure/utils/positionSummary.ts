import type { BulkUploadColumn } from "@/features/shared/shared";
import type { Position } from "@/features/positions/positions";

export const countActivePositions = (positions: Position[]): number =>
    positions.filter(position => position.status).length;

export const positionsSummaryLabel = (count: number, active: number): string =>
    `${count} ${count === 1 ? 'posición' : 'posiciones'} · ${active} ${active === 1 ? 'activa' : 'activas'}`;

export const positionBulkUploadColumns: BulkUploadColumn[] = [
    { header: "Código", description: "Código del puesto, único dentro del SKU de la línea" },
    { header: "Actividad", description: "Nombre de una actividad del catálogo asignada al SKU" },
    { header: "Línea", description: "Código de una línea existente" },
    { header: "SKU", description: "Código de un SKU configurado en la línea" },
];

export const positionBulkUploadNote = (line: string, sku: string): string =>
    `Usa el código de la línea ${line} en la columna Línea y ${sku} en la columna SKU. Las actividades deben estar asignadas al SKU antes de cargar las posiciones.`;
