import { useState } from "react";
import { buildCandidateRows, type CandidateAction, type CandidateRowChange, type WeeklyPlanEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export function useCandidateRows(candidates: WeeklyPlanEmployee[]) {
    const [changes, setChanges] = useState<Record<number, CandidateRowChange>>({});
    const [additions, setAdditions] = useState<number[]>([]);

    const rows = buildCandidateRows(candidates, changes);

    const setAction = (candidateId: number, action: CandidateAction) =>
        setChanges((prev) => ({ ...prev, [candidateId]: { action } }));

    const setReplacement = (candidateId: number, replacementId?: number) =>
        setChanges((prev) => ({ ...prev, [candidateId]: { action: 'replace', replacementId } }));

    const addAddition = (employeeId: number) =>
        setAdditions((prev) => (prev.includes(employeeId) ? prev : [...prev, employeeId]));

    const removeAddition = (employeeId: number) =>
        setAdditions((prev) => prev.filter((id) => id !== employeeId));

    const reset = () => {
        setChanges({});
        setAdditions([]);
    };

    return { rows, additions, setAction, setReplacement, addAddition, removeAddition, reset };
}
