import type { UIMessage } from "ai";

export type AssistantToolActivity = {
    id: string;
    label: string;
    done: boolean;
    failed: boolean;
};

const ASSISTANT_TOOL_LABELS: Record<string, string> = {
    SearchWeeklyPlanTasks: 'Búsqueda de tareas',
    GetWeeklyPlanTaskDetail: 'Detalle de tarea',
    GetWeeklyPlanTaskCaptureFields: 'Campos de captura',
    GetWeeklyPlanTaskEmployees: 'Empleados asignados',
    GetWeeklyPlanTaskTimeouts: 'Tiempos muertos',
    GetWeeklyPlanTaskLogs: 'Bitácora de cambios',
    GetWeeklyPlanTaskObservations: 'Observaciones',
    ListPalletRecords: 'Tomas por tarima',
    SummarizePalletRecords: 'Resumen de tarimas',
    ListLotRecords: 'Tomas por lote',
    SummarizeLotRecords: 'Resumen de lotes',
    ListProductRecords: 'Tomas por producto',
    SummarizeProductRecords: 'Resumen de productos'
};

const DEFAULT_TOOL_LABEL = 'Consulta de datos';

const normalizeToolName = (name: string): string => {
    const pascal = name.replace(/(^|[_-])(\w)/g, (_, __, letter: string) => letter.toUpperCase());

    return pascal.replace(/Tool$/, '');
}

export const getToolLabel = (name: string): string => {
    return ASSISTANT_TOOL_LABELS[name] ?? ASSISTANT_TOOL_LABELS[normalizeToolName(name)] ?? DEFAULT_TOOL_LABEL;
}

export const getToolActivities = (message: UIMessage): AssistantToolActivity[] => {
    const activities: AssistantToolActivity[] = [];

    message.parts.forEach((part, index) => {
        const isDynamic = part.type === 'dynamic-tool';
        const isStatic = part.type.startsWith('tool-');

        if (!isDynamic && !isStatic) return;

        const tool = part as { toolCallId?: string; toolName?: string; state?: string };
        const name = isDynamic ? tool.toolName ?? '' : part.type.slice('tool-'.length);

        activities.push({
            id: tool.toolCallId ?? `${message.id}-${index}`,
            label: getToolLabel(name),
            done: tool.state === 'output-available' || tool.state === 'output-error',
            failed: tool.state === 'output-error'
        });
    });

    return activities;
}

export const getUniqueToolLabels = (activities: AssistantToolActivity[]): string[] => {
    return [...new Set(activities.map((activity) => activity.label))];
}
