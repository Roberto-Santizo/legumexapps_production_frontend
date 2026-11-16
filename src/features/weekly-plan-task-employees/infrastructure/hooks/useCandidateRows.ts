import { useState } from "react";
import { buildCandidateRows, type AdditionRow, type CandidateAction, type CandidateRowChange, type WeeklyPlanEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export function useCandidateRows(candidates: WeeklyPlanEmployee[]) {
    const [changes, setChanges] = useState<Record<string, CandidateRowChange>>({});
    const [additions, setAdditions] = useState<AdditionRow[]>([]);

    const rows = buildCandidateRows(candidates, changes);
    const hasChanges = Object.keys(changes).length > 0 || additions.length > 0;

    const setAction = (candidateId: string, action: CandidateAction) =>
        setChanges((prev) => ({ ...prev, [candidateId]: { action, lineActivityId: prev[candidateId]?.lineActivityId } }));

    const setReplacement = (candidateId: string, replacementId?: string) =>
        setChanges((prev) => ({ ...prev, [candidateId]: { ...prev[candidateId], action: 'replace', replacementId } }));

    const setRowActivity = (candidateId: string, lineActivityId?: number) =>
        setChanges((prev) => ({ ...prev, [candidateId]: { ...(prev[candidateId] ?? { action: 'keep' }), lineActivityId } }));

    const addAddition = (employeeId: string) =>
        setAdditions((prev) => (prev.some((addition) => addition.employeeId === employeeId) ? prev : [...prev, { employeeId }]));

    const removeAddition = (employeeId: string) =>
        setAdditions((prev) => prev.filter((addition) => addition.employeeId !== employeeId));

    const setAdditionActivity = (employeeId: string, lineActivityId?: number) =>
        setAdditions((prev) => prev.map((addition) => (addition.employeeId === employeeId ? { ...addition, lineActivityId } : addition)));

    const reset = () => {
        setChanges({});
        setAdditions([]);
    };

    return { rows, additions, hasChanges, setAction, setReplacement, setRowActivity, addAddition, removeAddition, setAdditionActivity, reset };
}
