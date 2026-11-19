import { findEmployeeById, getOverbookedSlots, type ActivitySlot, type AddedEmployee, type AdditionRow, type CandidateRow, type CandidateRowChange, type ConfirmedWeeklyPlanTaskEmployee, type ConfirmSummary, type ConfirmWeeklyPlanTaskEmployeesForm, type WeeklyPlanEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

const KEEP_CHANGE: CandidateRowChange = { action: 'keep' };

export const buildCandidateRows = (candidates: WeeklyPlanEmployee[], changes: Record<string, CandidateRowChange>): CandidateRow[] =>
    candidates.map((candidate) => ({ candidate, ...(changes[candidate.id] ?? KEEP_CHANGE) }));

export const isFinalMember = (row: CandidateRow): boolean =>
    row.action === 'keep' || (row.action === 'replace' && row.replacementId !== undefined);

export const toConfirmedEmployee = (employee: WeeklyPlanEmployee, lineActivityId: number | null, position = employee.position): ConfirmedWeeklyPlanTaskEmployee => ({
    code: employee.code,
    name: employee.name,
    position,
    line_activity_id: lineActivityId,
});

const resolveLineActivityId = (lineActivityId: number | undefined, allowUnassigned: boolean): number | null | undefined =>
    lineActivityId ?? (allowUnassigned ? null : undefined);

const toConfirmedRowEmployee = (row: CandidateRow, replacementEmployees: WeeklyPlanEmployee[], allowUnassigned: boolean): ConfirmedWeeklyPlanTaskEmployee[] => {
    const lineActivityId = resolveLineActivityId(row.lineActivityId, allowUnassigned);

    if (!isFinalMember(row) || lineActivityId === undefined) return [];
    if (row.action === 'keep') return [toConfirmedEmployee(row.candidate, lineActivityId)];

    const replacement = findEmployeeById(replacementEmployees, row.replacementId);

    return replacement ? [toConfirmedEmployee(replacement, lineActivityId, row.candidate.position)] : [];
};

export const pickAddedEmployees = (employees: WeeklyPlanEmployee[], additions: AdditionRow[]): AddedEmployee[] =>
    additions.flatMap((addition) => {
        const employee = findEmployeeById(employees, addition.employeeId);
        return employee ? [{ employee, lineActivityId: addition.lineActivityId }] : [];
    });

const toConfirmedAddedEmployee = ({ employee, lineActivityId }: AddedEmployee, allowUnassigned: boolean): ConfirmedWeeklyPlanTaskEmployee[] => {
    const resolvedId = resolveLineActivityId(lineActivityId, allowUnassigned);

    return resolvedId === undefined ? [] : [toConfirmedEmployee(employee, resolvedId)];
};

export const buildConfirmBody = (rows: CandidateRow[], additions: AdditionRow[], replacementEmployees: WeeklyPlanEmployee[], allowUnassigned = false): ConfirmWeeklyPlanTaskEmployeesForm => ({
    employees: [
        ...rows.flatMap((row) => toConfirmedRowEmployee(row, replacementEmployees, allowUnassigned)),
        ...pickAddedEmployees(replacementEmployees, additions).flatMap((added) => toConfirmedAddedEmployee(added, allowUnassigned)),
    ],
});

export const getSelectedActivityIds = (rows: CandidateRow[], additions: AdditionRow[]): (number | undefined)[] => [
    ...rows.filter(isFinalMember).map((row) => row.lineActivityId),
    ...additions.map((addition) => addition.lineActivityId),
];

export const getConfirmSummary = (rows: CandidateRow[], additions: AdditionRow[]): ConfirmSummary => {
    const kept = rows.filter((row) => row.action === 'keep').length;
    const replacements = rows.filter((row) => row.action === 'replace' && row.replacementId).length;
    const pendingReplacements = rows.filter((row) => row.action === 'replace' && !row.replacementId).length;
    const removals = rows.filter((row) => row.action === 'remove').length;
    const pendingActivities = getSelectedActivityIds(rows, additions).filter((id) => id === undefined).length;

    return {
        finalCount: kept + replacements + additions.length,
        replacements,
        additions: additions.length,
        removals,
        pendingReplacements,
        pendingActivities,
    };
};

export const getConfirmBlockReason = (summary: ConfirmSummary, slots: ActivitySlot[], allowUnassigned = false): string | null => {
    if (slots.length === 0) return 'La línea no tiene actividades configuradas';
    if (summary.pendingReplacements > 0) return 'Elige quién entra en cada reemplazo pendiente';
    if (!allowUnassigned && summary.pendingActivities > 0) return `Asigna una actividad a cada empleado (${summary.pendingActivities} sin actividad)`;
    if (getOverbookedSlots(slots).length > 0) return 'Hay actividades con más personas que lugares';
    if (summary.finalCount === 0) return 'La tarea debe quedar con al menos un empleado';

    return null;
};

export const getTakenEmployeeIds = (rows: CandidateRow[], additions: AdditionRow[], ownerId?: string): Set<string> => {
    const taken = new Set<string>(additions.map((addition) => addition.employeeId));

    rows.forEach((row) => {
        if (row.action === 'keep') taken.add(row.candidate.id);
        if (row.replacementId && row.candidate.id !== ownerId) taken.add(row.replacementId);
    });

    if (ownerId) taken.add(ownerId);

    return taken;
};
