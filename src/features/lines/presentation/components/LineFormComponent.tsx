import { SelectFormField, TextFormField } from "@/features/shared/shared";
import { captureTypeOptions } from "@/features/capture-fields/capture-fields";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { LineForm } from "@/features/lines/lines";

type Props = {
    register: UseFormRegister<LineForm>;
    errors: FieldErrors<LineForm>;
    control: Control<LineForm, any>;
    captureTypeLocked?: boolean;
}

export function LineFormComponent({ register, errors, control, captureTypeLocked = false }: Props) {
    return (
        <>
            <TextFormField<LineForm>
                name="name"
                label="Nombre"
                placeholder="Nombre de la línea"
                register={register}
                validation={{ required: 'El campo es requerido' }}
                type="text"
                errorMessage={errors.name?.message}
            />

            <TextFormField<LineForm>
                name="code"
                label="Código"
                placeholder="Códificación de la Línea"
                register={register}
                validation={{ required: 'El campo es requerido' }}
                type="text"
                errorMessage={errors.code?.message}
            />

            <SelectFormField<LineForm>
                name="shift"
                label="Turno"
                control={control}
                validation={{ required: 'El campo es requerido' }}
                options={[{ value: 1, label: 'AM' }, { value: 0, label: 'PM' }]}
                errorMessage={errors.shift?.message}
            />

            <div className="space-y-1.5">
                <SelectFormField<LineForm>
                    name="capture_type"
                    label="Familia de captura"
                    control={control}
                    validation={{ required: 'El campo es requerido' }}
                    options={captureTypeOptions}
                    errorMessage={errors.capture_type?.message}
                    disabled={captureTypeLocked}
                />

                {captureTypeLocked && (
                    <p className="text-xs text-ink-muted">
                        Quita los campos configurados de la línea para cambiar su familia de captura.
                    </p>
                )}
            </div>
        </>
    )
}
