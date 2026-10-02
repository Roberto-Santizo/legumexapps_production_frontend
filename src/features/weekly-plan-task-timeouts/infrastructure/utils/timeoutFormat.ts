const dateTimeFormatter = new Intl.DateTimeFormat('es-GT', {
    timeZone: 'America/Guatemala',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
});

const timeFormatter = new Intl.DateTimeFormat('es-GT', {
    timeZone: 'America/Guatemala',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
});

const parseDate = (value: string) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
};

export function formatTimeoutDateTime(value: string | null): string | null {
    if (!value) return null;
    const date = parseDate(value);
    return date ? dateTimeFormatter.format(date) : value;
}

export function formatTimeoutTime(value: string | null): string | null {
    if (!value) return null;
    const date = parseDate(value);
    return date ? timeFormatter.format(date) : value;
}

export function formatMinutes(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} min`;
    return `${hours} h ${String(minutes).padStart(2, '0')} min`;
}

export const formatDurationHours = (hours: number) => formatMinutes(Math.round(hours * 60));

export function formatElapsed(milliseconds: number): string {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds].map(part => String(part).padStart(2, '0')).join(':');
}

export const toNullableText = (value: unknown): string | null =>
    typeof value === 'string' && value.trim() !== '' ? value.trim() : null;
