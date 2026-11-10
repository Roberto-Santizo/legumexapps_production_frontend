export const hasTaskPositions = (positions: number): boolean => positions > 0;

export const exceedsTaskPositions = (positions: number, candidates: number): boolean =>
    hasTaskPositions(positions) && candidates > positions;
