import { InformationField } from "@/features/shared/shared";
import { formatDurationHours } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";
import type { WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

type Props = {
    task: WeeklyPlanTask;
}

export function TimeoutTaskSummary({ task }: Props) {
    return (
        <div className="rounded-xl border border-line bg-surface px-5 py-4">
            <p className="truncate text-sm font-semibold text-ink" title={task.sku_name}>{task.sku_name}</p>

            <dl className="mt-3 grid grid-cols-2 gap-x-8 gap-y-3">
                <InformationField label="Línea" value={task.line_code} mono />
                <InformationField label="Tiempo detenido" value={formatDurationHours(task.timeout_hours)} mono />
            </dl>
        </div>
    )
}
