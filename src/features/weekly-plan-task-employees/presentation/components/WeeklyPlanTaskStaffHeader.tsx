import { getStaffModeDescription } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    status: number;
}

export function WeeklyPlanTaskStaffHeader({ status }: Props) {
    return (
        <div className="border-b border-line pb-3">
            <h2 className="text-base font-semibold text-ink">Personal de la tarea</h2>
            <p className="mt-1 max-w-2xl text-sm text-ink-muted">{getStaffModeDescription(status)}</p>
        </div>
    )
}
