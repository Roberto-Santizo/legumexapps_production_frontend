const STALE_STATE_MESSAGES = [
    'Solo se pueden registrar tiempos muertos',
    'La tarea ya tiene un tiempo muerto abierto',
    'El tiempo muerto ya fue finalizado',
    'El tiempo muerto no existe'
];

export const isStaleTimeoutStateError = (message: string) =>
    STALE_STATE_MESSAGES.some(prefix => message.startsWith(prefix));
