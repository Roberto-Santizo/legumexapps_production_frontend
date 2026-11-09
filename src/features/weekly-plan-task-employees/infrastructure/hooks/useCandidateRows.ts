import { useState } from "react";
import { buildCandidateRows, type CandidateAction, type CandidateRowChange, type WeeklyPlanEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export function useCandidateRows(candidates: WeeklyPlanEmployee[]) {
    const [changes, setChanges] = useState<Record<string, CandidateRowChange>>({});
    const [additions, setAdditions] = useState<string[]>([]);

    const rows = buildCandidateRows(candidates, changes);

    const setAction = (candidateId: string, action: CandidateAction) =>
        setChanges((prev) => ({ ...prev, [candidateId]: { action } }));

    const setReplacement = (candidateId: string, replacementId?: string) =>
        setChanges((prev) => ({ ...prev, [candidateId]: { action: 'replace', replacementId } }));

    const addAddition = (employeeId: string) =>
        setAdditions((prev) => (prev.includes(employeeId) ? prev : [...prev, employeeId]));

    const removeAddition = (employeeId: string) =>
        setAdditions((prev) => prev.filter((id) => id !== employeeId));

    const reset = () => {
        setChanges({});
        setAdditions([]);
    };

    return { rows, additions, setAction, setReplacement, addAddition, removeAddition, reset };
}
