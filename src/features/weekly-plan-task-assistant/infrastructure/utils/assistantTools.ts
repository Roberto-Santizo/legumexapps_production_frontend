import { getToolName, isToolUIPart, type UIMessage } from "ai";
import { isAudioSummaryTool } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

export type AssistantToolActivity = {
    id: string;
    label: string;
    done: boolean;
    failed: boolean;
};

export type AssistantToolPart = {
    id: string;
    name: string;
    state: string;
    output: unknown;
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

export const normalizeToolName = (name: string): string => {
    const pascal = name.replace(/(^|[_-])(\w)/g, (_, __, letter: string) => letter.toUpperCase());

    return pascal.replace(/Tool$/, '');
}

export const getToolLabel = (name: string): string => {
    return ASSISTANT_TOOL_LABELS[name] ?? ASSISTANT_TOOL_LABELS[normalizeToolName(name)] ?? DEFAULT_TOOL_LABEL;
}

export const getToolParts = (message: UIMessage): AssistantToolPart[] => {
    const tools: AssistantToolPart[] = [];

    message.parts.forEach((part, index) => {
        if (!isToolUIPart(part)) return;

        tools.push({
            id: part.toolCallId ?? `${message.id}-${index}`,
            name: getToolName(part),
            state: part.state,
            output: 'output' in part ? part.output : undefined
        });
    });

    return tools;
}

export const getToolActivities = (message: UIMessage): AssistantToolActivity[] => {
    return getToolParts(message)
        .filter((tool) => !isAudioSummaryTool(tool.name))
        .map((tool) => ({
            id: tool.id,
            label: getToolLabel(tool.name),
            done: tool.state === 'output-available' || tool.state === 'output-error',
            failed: tool.state === 'output-error'
        }));
}

export const getUniqueToolLabels = (activities: AssistantToolActivity[]): string[] => {
    return [...new Set(activities.map((activity) => activity.label))];
}
