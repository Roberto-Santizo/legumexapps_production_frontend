import { useWatch, type Control } from "react-hook-form";
import type { LineCaptureFormValues, LineField } from "@/features/line-fields/line-fields";
import { DifferenceValue, estimatePerformanceRecordValues, formatPounds, getEstimateValue, toNullableNumber } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type Props = {
    control: Control<LineCaptureFormValues>;
    calculatedFields: LineField[];
    poundsPerBox: number | null;
}

export function PerformanceRecordEstimate({ control, calculatedFields, poundsPerBox }: Props) {
    const [scaleWeight, tare, boxes] = useWatch({ control, name: ['scale_weight', 'tare', 'boxes'] });

    if (calculatedFields.length === 0) return null;

    const estimate = estimatePerformanceRecordValues({
        scaleWeight: toNullableNumber(scaleWeight),
        tare: toNullableNumber(tare),
        boxes: toNullableNumber(boxes)
    }, poundsPerBox);

    const usesTicket = calculatedFields.some(field => field.key === 'ticket_weight');

    return (
        <div className="space-y-2">
            <div className="flex divide-x divide-line overflow-hidden rounded-xl border border-line bg-canvas/60">
                {calculatedFields.map(field => {
                    const value = getEstimateValue(estimate, field.key);

                    return (
                        <div key={field.id} className="min-w-0 flex-1 px-4 py-3">
                            <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">{field.label}</p>
                            <p className="mt-1 text-lg">
                                {field.key === 'difference'
                                    ? <DifferenceValue difference={value} />
                                    : <span className={`font-mono tabular-nums ${value !== null ? 'text-ink' : 'text-ink-subtle'}`}>{value !== null ? formatPounds(value) : '—'}</span>}
                            </p>
                        </div>
                    );
                })}
            </div>

            <p className="text-xs text-ink-subtle">
                {usesTicket && poundsPerBox === null
                    ? 'El SKU no tiene presentación configurada: no se calcula peso boleta ni diferencial.'
                    : usesTicket
                        ? `Estimado con ${formatPounds(poundsPerBox ?? 0)} lbs por caja según el plan. El sistema confirma los cálculos al guardar.`
                        : 'Estimado en libras. El sistema confirma los cálculos al guardar.'}
            </p>
        </div>
    )
}
