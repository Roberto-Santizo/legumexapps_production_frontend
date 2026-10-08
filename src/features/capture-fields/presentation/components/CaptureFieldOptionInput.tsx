import { isDuplicateOption, type CaptureFieldForm } from "@/features/capture-fields/capture-fields";
import { XIcon } from "lucide-react";
import { useController, type Control } from "react-hook-form";

type Props = {
    control: Control<CaptureFieldForm>;
    index: number;
    canRemove: boolean;
    onRemove: () => void;
}

export function CaptureFieldOptionInput({ control, index, canRemove, onRemove }: Props) {
    const { field, fieldState } = useController({
        control,
        name: `options.${index}.value`,
        rules: {
            required: 'Cada opción es obligatoria.',
            maxLength: { value: 100, message: 'Cada opción no debe exceder 100 caracteres.' },
            validate: (value, values) => !isDuplicateOption(value, values.options) || 'Las opciones no se pueden repetir.'
        }
    });

    const error = fieldState.error?.message;

    return (
        <li className="flex items-start gap-2">
            <span className="mt-2.5 w-6 shrink-0 text-right font-mono text-xs tabular-nums text-ink-subtle">{index + 1}</span>

            <div className="flex-1">
                <input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Ej. APROBADO"
                    autoComplete="off"
                    aria-label={`Opción ${index + 1}`}
                    aria-invalid={Boolean(error)}
                    className={error ? 'text_form_field_error' : 'text_form_field'}
                />
                {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
            </div>

            <button
                type="button"
                onClick={onRemove}
                disabled={!canRemove}
                aria-label={`Quitar opción ${index + 1}`}
                className="mt-1.5 rounded-md p-1.5 text-ink-subtle transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-30"
            >
                <XIcon className="size-4" />
            </button>
        </li>
    )
}
