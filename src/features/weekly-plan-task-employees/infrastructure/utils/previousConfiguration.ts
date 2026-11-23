import type { CandidateRowChange, PreviousDistribution, PreviousDistributionSources, PreviousEmployee, WeeklyPlanEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

const EMPTY_DISTRIBUTION: PreviousDistribution = { changes: {}, additions: [], placedCount: 0, unavailable: [] };

const findEmployeeByCode = (employees: WeeklyPlanEmployee[], code: string): WeeklyPlanEmployee | undefined =>
    employees.find((employee) => employee.code === code);

const resolveActivityId = (lineActivityId: number | null, activityIds: number[]): number | undefined =>
    lineActivityId !== null && activityIds.includes(lineActivityId) ? lineActivityId : undefined;

const findReplacedCandidate = (previous: PreviousEmployee, candidates: WeeklyPlanEmployee[], previousCodes: Set<string>, changes: Record<string, CandidateRowChange>): WeeklyPlanEmployee | undefined =>
    previous.position
        ? candidates.find((candidate) => candidate.position === previous.position && !previousCodes.has(candidate.code) && !changes[candidate.id])
        : undefined;

const withCandidateChange = (distribution: PreviousDistribution, candidateId: string, change: CandidateRowChange): PreviousDistribution => ({
    ...distribution,
    changes: { ...distribution.changes, [candidateId]: change },
    placedCount: distribution.placedCount + 1,
});

export const buildPreviousDistribution = (employees: PreviousEmployee[], { candidates, replacementEmployees, activityIds }: PreviousDistributionSources): PreviousDistribution => {
    const previousCodes = new Set(employees.map((employee) => employee.code));

    return employees.reduce<PreviousDistribution>((distribution, previous) => {
        const lineActivityId = resolveActivityId(previous.line_activity_id, activityIds);
        const candidate = findEmployeeByCode(candidates, previous.code);

        if (candidate) return withCandidateChange(distribution, candidate.id, { action: 'keep', lineActivityId });

        const substitute = findEmployeeByCode(replacementEmployees, previous.code);

        if (!substitute) return { ...distribution, unavailable: [...distribution.unavailable, previous] };

        const replaced = findReplacedCandidate(previous, candidates, previousCodes, distribution.changes);

        if (replaced) return withCandidateChange(distribution, replaced.id, { action: 'replace', replacementId: substitute.id, lineActivityId });

        return {
            ...distribution,
            additions: [...distribution.additions, { employeeId: substitute.id, lineActivityId }],
            placedCount: distribution.placedCount + 1,
        };
    }, EMPTY_DISTRIBUTION);
};

export const getPreviousConfigurationMessage = ({ placedCount }: PreviousDistribution): string =>
    `Configuración anterior cargada: ${placedCount} ${placedCount === 1 ? 'empleado' : 'empleados'}`;

export const getPreviousConfigurationWarning = (previousCount: number): string =>
    previousCount === 0
        ? 'La última tarea finalizada de la línea no tiene personal activo'
        : 'Nadie de la configuración anterior está disponible para esta tarea';

export const getPreviousConfigurationQuestion = () => ({
    title: '¿Cargar la configuración anterior?',
    description: 'Los cambios hechos en el tablero se reemplazarán por el personal de la última tarea finalizada de la línea.',
});

export const formatUnavailableTitle = (count: number): string =>
    count === 1 ? '1 empleado de la configuración anterior no está disponible' : `${count} empleados de la configuración anterior no están disponibles`;
