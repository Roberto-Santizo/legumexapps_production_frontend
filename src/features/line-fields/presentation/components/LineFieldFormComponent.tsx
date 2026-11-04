import { TextFormField } from "@/features/shared/shared";
import type { LineField, LineFieldForm } from "@/features/line-fields/line-fields";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
    field: LineField;
    register: UseFormRegister<LineFieldForm>;
    errors: FieldErrors<LineFieldForm>;
}

export function LineFieldFormComponent({ field, register, errors }: Props) {
    return (
        <>
            <div className="space-y-1.5">
                <TextFormField<LineFieldForm>
                    name="label"
                    label="Etiqueta en esta línea"
                    placeholder={field.field_label}
                    register={register}
                    type="text"
                    validation={{ maxLength: { value: 100, message: 'La etiqueta no debe exceder 100 caracteres.' } }}
                    errorMessage={errors.label?.message}
                />
                <p className="text-xs text-ink-muted">
                    Déjala vacía para usar la del catálogo: <span className="font-medium text-ink">{field.field_label}</span>.
                </p>
            </div>

            {field.is_calculated ? (
                <p className="rounded-lg border border-line bg-canvas px-3 py-2 text-xs text-ink-muted">
                    Es un campo calculado: se muestra como solo lectura y nunca es obligatorio.
                </p>
            ) : (
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line px-3 py-2.5 transition-colors hover:border-line-strong">
                    <input type="checkbox" {...register('is_required')} className="mt-0.5 size-4 accent-ink" />
                    <span>
                        <span className="block text-sm font-medium text-ink">Obligatorio</span>
                        <span className="block text-xs text-ink-muted">No se podrá enviar el registro sin este dato.</span>
                    </span>
                </label>
            )}
        </>
    )
}
