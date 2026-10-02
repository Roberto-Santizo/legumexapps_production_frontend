import { useWatch, type Control } from "react-hook-form";
import { DifferenceValue, estimateTheoreticalPounds, formatPounds, toNullableNumber, type WeeklyPlanTaskPerformanceRecordForm } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type Props = {
    control: Control<WeeklyPlanTaskPerformanceRecordForm>;
    poundsPerBox: number | null;
}

export function PerformanceRecordEstimate({ control, poundsPerBox }: Props) {
    const [boxes, weighedPounds] = useWatch({ control, name: ['boxes', 'weighed_pounds'] });

    if (poundsPerBox === null) return (
        <p className="rounded-lg border border-dashed border-line-strong px-4 py-3 text-xs text-ink-muted">
            Este SKU no tiene presentación configurada: solo se registra el peso, sin comparación contra el teórico.
        </p>
    );

    const theoretical = estimateTheoreticalPounds(toNullableNumber(boxes), poundsPerBox);
    const weighed = Number.isFinite(weighedPounds) ? weighedPounds : null;
    const difference = theoretical !== null && weighed !== null ? weighed - theoretical : null;

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-2 divide-x divide-line overflow-hidden rounded-xl border border-line bg-canvas/60">
                <div className="px-4 py-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">Teórico estimado</p>
                    <p className="mt-1 font-mono text-lg tabular-nums text-ink">
                        {theoretical !== null ? `${formatPounds(theoretical)} lbs` : '—'}
                    </p>
                </div>

                <div className="px-4 py-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">Diferencia</p>
                    <p className="mt-1 text-lg">
                        <DifferenceValue difference={difference} />
                    </p>
                </div>
            </div>

            <p className="text-xs text-ink-subtle">
                {formatPounds(poundsPerBox)} lbs por caja según el plan. El cálculo final lo confirma el sistema al guardar.
            </p>
        </div>
    )
}
