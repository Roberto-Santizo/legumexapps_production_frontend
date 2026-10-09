import { InformationField } from "@/features/shared/shared";
import { PoundsProgressMeter } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import type { WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

type Props = {
    task: WeeklyPlanTask;
    nextPalletNumber?: number | null;
}

export function PerformanceRecordTaskSummary({ task, nextPalletNumber }: Props) {
    return (
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
            <div className="border-b border-line px-5 py-4">
                <p className="truncate text-sm font-semibold text-ink" title={task.sku_name}>{task.sku_name}</p>

                <dl className="mt-3 grid grid-cols-2 gap-x-8 gap-y-3">
                    <InformationField label="Código" value={task.sku_code} mono />
                    {nextPalletNumber !== undefined && (
                        <InformationField label="Siguiente tarima" value={nextPalletNumber !== null ? String(nextPalletNumber) : '—'} mono />
                    )}
                </dl>
            </div>

            <PoundsProgressMeter recorded={task.recorded_pounds} planned={task.planned_pounds} />
        </div>
    )
}
