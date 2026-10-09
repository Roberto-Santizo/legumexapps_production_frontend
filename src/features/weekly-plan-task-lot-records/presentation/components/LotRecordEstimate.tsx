import { useWatch, type Control } from "react-hook-form";
import type { LineCaptureFormValues, LineField } from "@/features/line-fields/line-fields";
import { formatPounds, toNullableNumber } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { estimateLotRecordValues, formatPercent, getLotEstimateValue, getLotYieldSegments, isLotPercentKey, LotYieldBar } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";

type Props = {
    control: Control<LineCaptureFormValues>;
    calculatedFields: LineField[];
}

export function LotRecordEstimate({ control, calculatedFields }: Props) {
    const [intake, applied, trimmed, overripe] = useWatch({ control, name: ['intake_lbs', 'applied_raw_lbs', 'trimmed_lbs', 'overripe_lbs'] });

    const input = {
        intakeLbs: toNullableNumber(intake),
        appliedRawLbs: toNullableNumber(applied),
        trimmedLbs: toNullableNumber(trimmed),
        overripeLbs: toNullableNumber(overripe)
    };

    const estimate = estimateLotRecordValues(input);
    const segments = getLotYieldSegments(input.appliedRawLbs, input.trimmedLbs, input.overripeLbs);

    if (calculatedFields.length === 0 && !segments) return null;

    return (
        <div className="space-y-3 rounded-xl border border-line bg-canvas/60 p-4">
            {calculatedFields.length > 0 && (
                <div className="flex divide-x divide-line">
                    {calculatedFields.map(field => {
                        const value = getLotEstimateValue(estimate, field.key);

                        return (
                            <div key={field.id} className="min-w-0 flex-1 px-3 first:pl-0 last:pr-0">
                                <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">{field.label}</p>
                                <p className={`mt-1 font-mono text-lg tabular-nums ${value !== null ? 'text-ink' : 'text-ink-subtle'}`}>
                                    {value === null ? '—' : isLotPercentKey(field.key) ? formatPercent(value) : formatPounds(value)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}

            {segments && <LotYieldBar segments={segments} />}

            <p className="text-xs text-ink-subtle">
                {segments
                    ? 'Composición de la MP aplicada. El sistema confirma los cálculos al guardar.'
                    : 'Ingresa la MP aplicada para estimar recuperación y saldo. El sistema confirma los cálculos al guardar.'}
            </p>
        </div>
    )
}
