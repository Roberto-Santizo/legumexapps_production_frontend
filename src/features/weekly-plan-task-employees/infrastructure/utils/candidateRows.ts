import type { CandidateRow, CandidateRowChange, ConfirmSummary, ConfirmWeeklyPlanTaskEmployeesForm, WeeklyPlanEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

const KEEP_CHANGE: CandidateRowChange = { action: 'keep' };

export const buildCandidateRows = (candidates: WeeklyPlanEmployee[], changes: Record<number, CandidateRowChange>): CandidateRow[] =>
    candidates.map((candidate) => ({ candidate, ...(changes[candidate.id] ?? KEEP_CHANGE) }));

export const buildConfirmBody = (rows: CandidateRow[], additions: number[]): ConfirmWeeklyPlanTaskEmployeesForm => ({
    replacements: rows
        .filter((row) => row.action === 'replace' && row.replacementId)
        .map((row) => ({
            weekly_plan_employee_id: row.candidate.id,
            replacement_weekly_plan_employee_id: row.replacementId!,
        })),
    additions,
    removals: rows.filter((row) => row.action === 'remove').map((row) => row.candidate.id),
});

export const getConfirmSummary = (rows: CandidateRow[], additions: number[]): ConfirmSummary => {
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

export const getTakenEmployeeIds = (rows: CandidateRow[], additions: number[], ownerId?: number): Set<number> => {
    const taken = new Set<number>(additions);

    rows.forEach((row) => {
        if (row.action === 'keep') taken.add(row.candidate.id);
        if (row.replacementId && row.candidate.id !== ownerId) taken.add(row.replacementId);
    });

    if (ownerId) taken.add(ownerId);

    return taken;
};
