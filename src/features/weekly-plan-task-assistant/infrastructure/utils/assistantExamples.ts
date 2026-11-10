export type AssistantExampleGroup = {
    family: string;
    questions: string[];
};

export const ASSISTANT_EXAMPLE_GROUPS: AssistantExampleGroup[] = [
    {
        family: 'Tarima',
        questions: [
            '¿Cuántas tarimas lleva la tarea 210 y cuál es su peso neto total?',
            'Muéstrame las tarimas de la tarea 3 con diferencial negativo.'
        ]
    },
    {
        family: 'Lote',
        questions: [
            '¿Qué % de recuperación tuvo Recorte LD en la semana 45 de 2026?',
            '¿Cuál fue el % de sobremadurez por lote en la tarea 215?'
        ]
    },
    {
        family: 'Producto',
        questions: [
            '¿Cuál es el % de rechazo por materia prima en la tarea 220?',
            'Compara la recuperación de cada tarea de producto de la semana 46 de 2026.'
        ]
    },
    {
        family: 'General',
        questions: [
            '¿Qué tareas están en progreso en la semana 46 de 2026?',
            '¿Cuántas horas de tiempo muerto tuvo la tarea 210 y por qué?'
        ]
    }
];
