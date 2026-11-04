import { CustomFilledButton, CustomForm } from "@/features/shared/shared";
import { LineCaptureFieldControl, type LineCaptureFormValues, type LineField } from "@/features/line-fields/line-fields";
import { getGeneralFormErrors, PerformanceRecordFormAlert, type PerformanceRecordFormErrors } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { useForm, type Control } from "react-hook-form";
import { useEffect, type ReactNode } from "react";

type Props = {
    fields: LineField[];
    defaultValues: LineCaptureFormValues;
    formErrors: PerformanceRecordFormErrors | null;
    submitLabel: string;
    isPending: boolean;
    onSubmit: (values: LineCaptureFormValues) => void;
    renderEstimate?: (control: Control<LineCaptureFormValues>) => ReactNode;
}

export function PerformanceRecordCaptureForm({ fields, defaultValues, formErrors, submitLabel, isPending, onSubmit, renderEstimate }: Props) {
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

            {renderEstimate?.(control)}

            <PerformanceRecordFormAlert messages={generalErrors} />

            <CustomFilledButton type="submit" label={submitLabel} disabled={isPending} fullWitdh />
        </CustomForm>
    )
}
