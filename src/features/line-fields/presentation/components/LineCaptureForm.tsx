import { CustomFilledButton, CustomForm } from "@/features/shared/shared";
import { defaultLineCaptureValues, LineCaptureFieldControl, LineFieldsEmptyState, toLineCaptureRecord, type LineCaptureFormValues, type LineCaptureRecord, type LineField } from "@/features/line-fields/line-fields";
import { useForm } from "react-hook-form";

type Props = {
    fields: LineField[];
    submitLabel: string;
    isPending?: boolean;
    className?: string;
    onSubmit: (record: LineCaptureRecord) => void;
}

export function LineCaptureForm({ fields, submitLabel, isPending = false, className, onSubmit }: Props) {
    const { handleSubmit, control } = useForm<LineCaptureFormValues>({
        defaultValues: defaultLineCaptureValues(fields)
    });

    if (fields.length === 0) return <LineFieldsEmptyState />

    const submit = (values: LineCaptureFormValues) => onSubmit(toLineCaptureRecord(fields, values));

    return (
        <CustomForm onSubmit={handleSubmit(submit)} className={className}>
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                {fields.map(field => (
                    <LineCaptureFieldControl key={field.id} field={field} control={control} />
                ))}
            </div>

            {fields.some(field => field.is_required) && (
                <p className="text-xs text-ink-muted">Los campos con * son obligatorios.</p>
            )}

            <CustomFilledButton type="submit" label={submitLabel} disabled={isPending} fullWitdh />
        </CustomForm>
    )
}
