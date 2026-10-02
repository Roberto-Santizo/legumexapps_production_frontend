const localDateTimeFormatter = new Intl.DateTimeFormat('es-GT', {
    timeZone: 'America/Guatemala',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
});

export function formatUtcDateTime(value: string | null): string | null {
    if (!value) return null;

    const date = new Date(`${value.replace(' ', 'T')}Z`);

    if (Number.isNaN(date.getTime())) return value;

    return localDateTimeFormatter.format(date);
}
