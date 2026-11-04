import { SelectFormField, TextFormField } from "@/features/shared/shared";
import { CAPTURE_FIELD_KEY_PATTERN, CaptureFieldOptionsField, captureFieldDataTypeOptions, type CaptureFieldForm } from "@/features/capture-fields/capture-fields";
import { useWatch, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";

type Props = {
    register: UseFormRegister<CaptureFieldForm>;
    errors: FieldErrors<CaptureFieldForm>;
    control: Control<CaptureFieldForm>;
    structureLocked?: boolean;
}

export function CaptureFieldFormComponent({ register, errors, control, structureLocked = false }: Props) {
    const dataType = useWatch({ control, name: 'data_type' });

    return (
        <>
            <TextFormField<CaptureFieldForm>
                name="label"
                label="Etiqueta"
                placeholder="Ej. Temperatura"
                register={register}
                type="text"
                validation={{
                    required: 'La etiqueta es obligatoria.',
                    maxLength: { value: 100, message: 'La etiqueta no debe exceder 100 caracteres.' }
                }}
                errorMessage={errors.label?.message}
            />

            <div className="space-y-1.5">
                <TextFormField<CaptureFieldForm>
                    name="key"
                    label="Clave"
                    placeholder="Ej. temperature"
                    register={register}
                    type="text"
                    disabled={structureLocked}
                    validation={{
                        required: 'La clave es obligatoria.',
                        maxLength: { value: 50, message: 'La clave no debe exceder 50 caracteres.' },
                        pattern: {
                            value: CAPTURE_FIELD_KEY_PATTERN,
                            message: 'La clave debe estar en snake_case: iniciar con una letra minúscula y contener solo minúsculas, números y guiones bajos.'
                        }
                    }}
                    errorMessage={errors.key?.message}
                />
                {!structureLocked && (
                    <p className="text-xs text-ink-muted">Identificador único del dato en todo el catálogo. Minúsculas, números y guiones bajos.</p>
                )}
            </div>

            <SelectFormField<CaptureFieldForm>
                name="data_type"
                label="Tipo de dato"
                control={control}
                options={captureFieldDataTypeOptions}
                disabled={structureLocked}
                validation={{ required: 'El tipo de dato es obligatorio.' }}
                errorMessage={errors.data_type?.message}
            />

            {structureLocked && (
                <p className="rounded-lg border border-line bg-canvas px-3 py-2 text-xs text-ink-muted">
                    El campo ya está asignado a líneas: la clave y el tipo de dato no se pueden cambiar. La etiqueta y las opciones sí.
                </p>
            )}

            <CaptureFieldOptionsField
                control={control}
                isSelect={dataType === 'select'}
            />
        </>
    )
}
