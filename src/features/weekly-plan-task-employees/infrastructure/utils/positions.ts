export const hasTaskPositions = (positions: number): boolean => positions > 0;

export const exceedsTaskPositions = (positions: number, candidates: number): boolean =>
    hasTaskPositions(positions) && candidates > positions;

export const getConfirmQuestion = (positions: number, finalCount: number) => {
    const description = `La tarea quedará con ${finalCount} empleados y pasará a lista para ejecución. La confirmación se hace una sola vez.`;

    if (!exceedsTaskPositions(positions, finalCount)) {
        return { title: '¿Desea confirmar el personal de la tarea?', description };
    }

    return {
        title: '¿Está seguro de confirmar más empleados que posiciones?',
        description: `La tarea tiene ${positions} posiciones y se confirmarán ${finalCount} empleados (${finalCount - positions} de más). ${description}`,
    };
};
