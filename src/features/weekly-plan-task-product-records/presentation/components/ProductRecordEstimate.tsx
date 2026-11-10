import { useWatch, type Control } from "react-hook-form";
import type { LineCaptureFormValues, LineField } from "@/features/line-fields/line-fields";
import { toNullableNumber } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { formatPercent, LotYieldBar } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";
import { estimateProductRecordValues, getProductEstimateValue, getProductYieldSegments } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";

type Props = {
    control: Control<LineCaptureFormValues>;
    calculatedFields: LineField[];
}

export function ProductRecordEstimate({ control, calculatedFields }: Props) {
    const [raw, trimmed, rejected] = useWatch({ control, name: ['raw_lbs', 'trimmed_lbs', 'rejected_lbs'] });

    const input = {
        rawLbs: toNullableNumber(raw),
        trimmedLbs: toNullableNumber(trimmed),
        rejectedLbs: toNullableNumber(rejected)
    };

    const estimate = estimateProductRecordValues(input);
    const segments = getProductYieldSegments(input.rawLbs, input.trimmedLbs, input.rejectedLbs);

    if (calculatedFields.length === 0 && !segments) return null;

    return (
        <div className="space-y-3 rounded-xl border border-line bg-canvas/60 p-4">
            {calculatedFields.length > 0 && (
                <div className="flex divide-x divide-line">
                    {calculatedFields.map(field => {
                        const value = getProductEstimateValue(estimate, field.key);

                        return (
                            <div key={field.id} className="min-w-0 flex-1 px-3 first:pl-0 last:pr-0">
                                <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">{field.label}</p>
                                <p className={`mt-1 font-mono text-lg tabular-nums ${value !== null ? 'text-ink' : 'text-ink-subtle'}`}>
                                    {value === null ? '—' : formatPercent(value)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}

            {segments && <LotYieldBar segments={segments} />}

            <p className="text-xs text-ink-subtle">
                {segments
                    ? 'Composición de la materia prima. El sistema confirma los cálculos al guardar.'
                    : 'Ingresa las libras de materia prima para estimar recuperación y rechazo. El sistema confirma los cálculos al guardar.'}
            </p>
        </div>
    )
}
