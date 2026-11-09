import { findEmployeeById, pickEmployeesByIds, type CandidateRow, type CandidateRowChange, type ConfirmedWeeklyPlanTaskEmployee, type ConfirmSummary, type ConfirmWeeklyPlanTaskEmployeesForm, type WeeklyPlanEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

const KEEP_CHANGE: CandidateRowChange = { action: 'keep' };

export const buildCandidateRows = (candidates: WeeklyPlanEmployee[], changes: Record<string, CandidateRowChange>): CandidateRow[] =>
    candidates.map((candidate) => ({ candidate, ...(changes[candidate.id] ?? KEEP_CHANGE) }));

export const toConfirmedEmployee = (employee: WeeklyPlanEmployee, position = employee.position): ConfirmedWeeklyPlanTaskEmployee => ({
    code: employee.code,
    name: employee.name,
    position,
});

const toConfirmedRowEmployee = (row: CandidateRow, replacementEmployees: WeeklyPlanEmployee[]): ConfirmedWeeklyPlanTaskEmployee[] => {
    if (row.action === 'keep') return [toConfirmedEmployee(row.candidate)];

    const replacement = row.action === 'replace' ? findEmployeeById(replacementEmployees, row.replacementId) : undefined;

    return replacement ? [toConfirmedEmployee(replacement, row.candidate.position)] : [];
};

export const buildConfirmBody = (rows: CandidateRow[], additions: string[], replacementEmployees: WeeklyPlanEmployee[]): ConfirmWeeklyPlanTaskEmployeesForm => ({
    employees: [
        ...rows.flatMap((row) => toConfirmedRowEmployee(row, replacementEmployees)),
        ...pickEmployeesByIds(replacementEmployees, additions).map((employee) => toConfirmedEmployee(employee)),
    ],
});

export const getConfirmSummary = (rows: CandidateRow[], additions: string[]): ConfirmSummary => {
    const kept = rows.filter((row) => row.action === 'keep').length;
    const replacements = rows.filter((row) => row.action === 'replace' && row.replacementId).length;
    const pendingReplacements = rows.filter((row) => row.action === 'replace' && !row.replacementId).length;
    const removals = rows.filter((row) => row.action === 'remove').length;

    return {
        finalCount: kept + replacements + additions.length,
        replacements,
        additions: additions.length,
        removals,
        pendingReplacements,
    };
};

export const getConfirmBlockReason = (summary: ConfirmSummary): string | null => {
    if (summary.pendingReplacements > 0) return 'Elige quién entra en cada reemplazo pendiente';
    if (summary.finalCount === 0) return 'La tarea debe quedar con al menos un empleado';

    return null;
};

export const getTakenEmployeeIds = (rows: CandidateRow[], additions: string[], ownerId?: string): Set<string> => {
    const taken = new Set<string>(additions);

    rows.forEach((row) => {
        if (row.action === 'keep') taken.add(row.candidate.id);
        if (row.replacementId && row.candidate.id !== ownerId) taken.add(row.replacementId);
    });

    if (ownerId) taken.add(ownerId);

    return taken;
};
