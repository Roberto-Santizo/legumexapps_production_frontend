export type PerformanceCoverageSegment = 'filled' | 'empty' | 'excess';

export type PerformanceCoverage = {
    created: number;
    available: number;
    missing: number;
    excess: number;
    percentage: number;
    segments: PerformanceCoverageSegment[] | null;
    message: string;
}

const MAX_SEGMENTS = 40;

const plural = (count: number, singular: string, pluralForm: string) => `${count} ${count === 1 ? singular : pluralForm}`;

const buildSegments = (created: number, available: number): PerformanceCoverageSegment[] | null => {
    const total = Math.max(created, available);
    if (total === 0 || total > MAX_SEGMENTS) return null;

    return Array.from({ length: total }, (_, index) => {
        if (index < Math.min(created, available)) return 'filled';
        if (index < available) return 'empty';
        return 'excess';
    });
}

const buildMessage = (created: number, available: number, missing: number, excess: number) => {
    if (available === 0 && created === 0) return 'Sin actividades asignadas';
    if (available === 0) return `${plural(created, 'posición', 'posiciones')} sin cupo de actividad`;
    if (missing > 0) return `Faltan ${plural(missing, 'posición', 'posiciones')} por crear`;
    if (excess > 0) return `${plural(excess, 'posición excede', 'posiciones exceden')} el cupo`;
    return 'Cupo de actividades cubierto';
}

export const buildPerformanceCoverage = (created: number, available: number): PerformanceCoverage => {
    const missing = Math.max(available - created, 0);
    const excess = Math.max(created - available, 0);
    const percentage = available > 0 ? Math.round((Math.min(created, available) / available) * 100) : 0;

    return {
        created,
        available,
        missing,
        excess,
        percentage,
        segments: buildSegments(created, available),
        message: buildMessage(created, available, missing, excess)
    };
}

export const staffingTone = ({ available, missing, excess, created }: PerformanceCoverage): string => {
    if (excess > 0 || (available === 0 && created > 0)) return 'bg-amber-500';
    if (available > 0 && missing === 0) return 'bg-ink';
    return 'bg-line-strong';
}

export const coverageBarWidths = ({ created, available }: PerformanceCoverage) => {
    const total = Math.max(created, available);
    if (total === 0) return { filled: 0, empty: 100, excess: 0 };

    return {
        filled: (Math.min(created, available) / total) * 100,
        empty: (Math.max(available - created, 0) / total) * 100,
        excess: (Math.max(created - available, 0) / total) * 100
    };
}
