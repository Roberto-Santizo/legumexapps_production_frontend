import { CustomFilledButton, CustomForm } from "@/features/shared/shared";
import { LineCaptureFieldControl, type LineCaptureFormValues, type LineField } from "@/features/line-fields/line-fields";
import { getGeneralFormErrors, PerformanceRecordEstimate, PerformanceRecordFormAlert, type PerformanceRecordFormErrors } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type Props = {
    fields: LineField[];
    calculatedFields: LineField[];
    poundsPerBox: number | null;
    defaultValues: LineCaptureFormValues;
    formErrors: PerformanceRecordFormErrors | null;
    submitLabel: string;
    isPending: boolean;
    onSubmit: (values: LineCaptureFormValues) => void;
}

export function PerformanceRecordCaptureForm({ fields, calculatedFields, poundsPerBox, defaultValues, formErrors, submitLabel, isPending, onSubmit }: Props) {
    const { handleSubmit, control, setError } = useForm<LineCaptureFormValues>({ defaultValues });

    useEffect(() => {
        Object.entries(formErrors?.byField ?? {}).forEach(([key, message]) => setError(key, { message }));
    }, [formErrors, setError]);

    const generalErrors = getGeneralFormErrors(formErrors, fields.map(field => field.key));

    return (
        <CustomForm onSubmit={handleSubmit(onSubmit)} className="border-none p-0 shadow-none">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {fields.map(field => (
                    <LineCaptureFieldControl key={field.id} field={field} control={control} />
                ))}
            </div>

            {fields.some(field => field.is_required) && (
                <p className="text-xs text-ink-muted">Los campos con * son obligatorios.</p>
            )}

            <PerformanceRecordEstimate control={control} calculatedFields={calculatedFields} poundsPerBox={poundsPerBox} />

            <PerformanceRecordFormAlert messages={generalErrors} />

            <CustomFilledButton type="submit" label={submitLabel} disabled={isPending} fullWitdh />
        </CustomForm>
    )
}
