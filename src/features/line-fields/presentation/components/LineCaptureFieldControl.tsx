import { isNumericCaptureControl, isWideCaptureControl,lineCaptureControlKind, lineCaptureInputAttributes, validateLineCaptureValue, type LineCaptureFormValues, type LineField } from "@/features/line-fields/line-fields";
import { SigmaIcon } from "lucide-react";
import { useController, type Control } from "react-hook-form";

type Props = {
    field: LineField;
    control: Control<LineCaptureFormValues>;
}

export function LineCaptureFieldControl({ field, control }: Props) {
    const { field: { ref, name, value, onChange, onBlur }, fieldState } = useController({
        control,
        name: field.key,
        rules: { validate: (value) => validateLineCaptureValue(field, value) }
    });

    const id = `capture-${field.key}`;
    const error = fieldState.error?.message;
    const kind = lineCaptureControlKind(field);
    const inputClass = error ? 'text_form_field_error' : 'text_form_field';
    const textValue = typeof value === 'string' ? value : '';

    if (kind === 'boolean') return (
        <label htmlFor={id} className="flex cursor-pointer items-center gap-3 self-end rounded-lg border border-line px-3 py-2.5 transition-colors hover:border-line-strong">
            <input
                id={id}
                type="checkbox"
                name={name}
                ref={ref}
                checked={Boolean(value)}
                onChange={(event) => onChange(event.target.checked)}
                onBlur={onBlur}
                className="size-4 accent-ink"
            />
            <span className="text-sm font-medium text-ink">{field.label}</span>
        </label>
    );

    return (
        <div className={`flex flex-col gap-2 ${isWideCaptureControl(kind) ? 'sm:col-span-2' : ''}`}>
            <label htmlFor={id} className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                {field.label}
                {field.is_required && <span className="text-ink-muted" aria-hidden="true">*</span>}
                {field.is_calculated && <SigmaIcon className="size-3.5 text-ink-subtle" aria-label="Calculado" />}
            </label>

            {field.is_calculated ? (
                <input
                    id={id}
                    readOnly
                    tabIndex={-1}
                    value=""
                    placeholder="Lo calcula el sistema"
                    className="w-full cursor-not-allowed rounded-lg border border-dashed border-line-strong bg-canvas px-3 py-2 font-mono text-sm text-ink-muted placeholder-ink-subtle"
                />
            ) : kind === 'textarea' ? (
                <textarea
                    id={id}
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={textValue}
                    rows={3}
                    aria-invalid={Boolean(error)}
                    className={`resize-none ${inputClass}`}
                />
            ) : kind === 'select' ? (
                <select
                    id={id}
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={textValue}
                    aria-invalid={Boolean(error)}
                    className={inputClass}
                >
                    <option value="">Seleccione una opción</option>
                    {(field.options ?? []).map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            ) : (
                <input
                    id={id}
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={textValue}
                    {...lineCaptureInputAttributes(kind)}
                    autoComplete="off"
                    aria-invalid={Boolean(error)}
                    className={`${inputClass} ${isNumericCaptureControl(kind) ? 'font-mono tabular-nums' : ''}`}
                />
            )}

            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    )
}
