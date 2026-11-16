export const hasTaskPositions = (positions: number): boolean => positions > 0;

export const exceedsCapacity = (capacity: number, candidates: number): boolean =>
    capacity > 0 && candidates > capacity;

export const getConfirmQuestion = (finalCount: number) => ({
    title: '¿Desea confirmar el personal de la tarea?',
    description: `La tarea quedará con ${finalCount} ${finalCount === 1 ? 'empleado' : 'empleados'} y pasará a lista para ejecución. La confirmación se hace una sola vez.`,
});
