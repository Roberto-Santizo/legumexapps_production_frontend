import type { UIMessage } from "ai";
import { AssistantAudioSummarySchema, getToolParts, normalizeToolName, type AssistantAudio, type AssistantToolPart } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

export const AUDIO_SUMMARY_TOOL = 'GenerateAudioSummary';
export const AUDIO_INVALID_ERROR = 'Respuesta de audio inválida';
export const AUDIO_GENERATION_ERROR = 'No se pudo generar el audio, intenta de nuevo';
export const AUDIO_PLAYBACK_ERROR = 'No se pudo reproducir el audio';
export const AUDIO_WAVEFORM_BARS = 40;

const AUDIO_ERROR_PREFIX = /^Error:\s*/;
const AUDIO_LINK_PATTERN = /\[[^\]]*\]\((https?:\/\/[^\s)]+?\.(?:wav|mp3)(?:\?[^\s)]*)?)\)/gi;

type ParsedAudioOutput = { url: string } | { error: string };

export const isAudioSummaryTool = (name: string): boolean => {
    return normalizeToolName(name) === AUDIO_SUMMARY_TOOL;
}

const readAudioOutput = (output: unknown): unknown => {
    if (typeof output !== 'string') return output;

    return JSON.parse(output);
}

export const parseAudioSummaryOutput = (output: unknown): ParsedAudioOutput => {
    if (typeof output === 'string' && AUDIO_ERROR_PREFIX.test(output)) {
        return { error: output.replace(AUDIO_ERROR_PREFIX, '') };
    }

    try {
        const parsed = AssistantAudioSummarySchema.safeParse(readAudioOutput(output));

        return parsed.success ? { url: parsed.data.audio_url } : { error: AUDIO_INVALID_ERROR };
    } catch {
        return { error: AUDIO_INVALID_ERROR };
    }
}

const toAssistantAudio = (tool: AssistantToolPart): AssistantAudio => {
    if (tool.state === 'output-available') {
        const parsed = parseAudioSummaryOutput(tool.output);

        return 'url' in parsed
            ? { id: tool.id, status: 'ready', url: parsed.url }
            : { id: tool.id, status: 'failed', error: parsed.error };
    }

    if (tool.state === 'output-error' || tool.state === 'output-denied') {
        return { id: tool.id, status: 'failed', error: AUDIO_GENERATION_ERROR };
    }

    return { id: tool.id, status: 'generating' };
}

export const getAudioToolSummaries = (message: UIMessage): AssistantAudio[] => {
    return getToolParts(message)
        .filter((tool) => isAudioSummaryTool(tool.name))
        .map(toAssistantAudio);
}

export const extractAudioLinks = (text: string): string[] => {
    return [...new Set([...text.matchAll(AUDIO_LINK_PATTERN)].map((match) => match[1]))];
}

export const getMessageAudios = (message: UIMessage, text: string): AssistantAudio[] => {
    const fromTools = getAudioToolSummaries(message);

    if (fromTools.length > 0) return fromTools;

    return extractAudioLinks(text).map((url, index) => ({ id: `${message.id}-audio-${index}`, status: 'ready', url }));
}

export const formatAudioTime = (seconds: number): string => {
    if (!Number.isFinite(seconds) || seconds < 0) return '--:--';

    const total = Math.floor(seconds);
    const minutes = Math.floor(total / 60);
    const rest = total % 60;

    return `${minutes}:${rest.toString().padStart(2, '0')}`;
}

const hashSeed = (seed: string): number => {
    return [...seed].reduce((hash, char) => Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0, 2166136261);
}

export const getWaveformBars = (seed: string, count: number = AUDIO_WAVEFORM_BARS): number[] => {
    let state = hashSeed(seed) || 1;

    return Array.from({ length: count }, (_, index) => {
        state = (Math.imul(state, 1103515245) + 12345) >>> 0;

        const noise = (state >>> 8) / 0xffffff;
        const envelope = 0.55 + 0.45 * Math.sin(((index + 0.5) / count) * Math.PI);

        return Math.round(18 + noise * envelope * 82);
    });
}
