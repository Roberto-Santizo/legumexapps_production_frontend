import { InformationField } from "@/features/shared/shared";
import { formatUtcDateTime, ProductionMeter, type WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

type Props = {
    task: WeeklyPlanTask;
    producedBoxes: number | null;
}

export function EndTaskSummary({ task, producedBoxes }: Props) {
    return (
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
            <div className="border-b border-line px-5 py-4">
                <p className="truncate text-sm font-semibold text-ink" title={task.sku_name}>{task.sku_name}</p>

                <dl className="mt-3 grid grid-cols-2 gap-x-8 gap-y-3">
                    <InformationField label="Código" value={task.sku_code} mono />
                    <InformationField label="Inicio" value={formatUtcDateTime(task.start_date) ?? 'Sin registrar'} mono />
                </dl>
            </div>

            <ProductionMeter label="Cajas producidas" unit="cajas" produced={producedBoxes} planned={task.boxes} />
        </div>
    )
}
