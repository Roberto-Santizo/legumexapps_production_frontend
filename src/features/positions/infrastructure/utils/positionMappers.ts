import type { Position, PositionForm } from "@/features/positions/positions";

export const NO_ACTIVITY_LABEL = 'Sin actividad';

export const getPositionActivityLabel = (position: Pick<Position, 'activity'>): string =>
    position.activity ?? NO_ACTIVITY_LABEL;

export const toPositionForm = (position: Position): Partial<PositionForm> => ({
    code: position.code,
    line_sku_id: position.line_sku_id,
    activity_id: position.activity_id ?? undefined
});
