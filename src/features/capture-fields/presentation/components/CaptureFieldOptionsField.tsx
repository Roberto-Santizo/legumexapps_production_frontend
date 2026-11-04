import { CaptureFieldOptionInput, type CaptureFieldForm } from "@/features/capture-fields/capture-fields";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, type Control } from "react-hook-form";

type Props = {
    control: Control<CaptureFieldForm>;
    isSelect: boolean;
}

export function CaptureFieldOptionsField({ control, isSelect }: Props) {
    const { fields, append, remove, replace } = useFieldArray({ control, name: 'options' });

    useEffect(() => {
        if (!isSelect && fields.length) replace([]);
        if (isSelect && !fields.length) append({ value: '' }, { shouldFocus: false });
    }, [isSelect, fields.length, append, replace]);

    if (!isSelect) return null;

    return (
        <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-gray-700">Opciones</legend>
            <p className="text-xs text-ink-muted">Se muestran en este orden en el formulario de captura.</p>

            <ol className="flex flex-col gap-2">
                {fields.map((item, index) => (
                    <CaptureFieldOptionInput
                        key={item.id}
                        control={control}
                        index={index}
                        canRemove={fields.length > 1}
                        onRemove={() => remove(index)}
                    />
                ))}
            </ol>

            <button
                type="button"
                onClick={() => append({ value: '' })}
                className="ml-8 inline-flex w-fit items-center gap-1.5 rounded-lg border border-dashed border-line-strong px-3 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:border-ink-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
            >
                <PlusIcon className="size-4" />
                Agregar opción
            </button>
        </fieldset>
    )
}
