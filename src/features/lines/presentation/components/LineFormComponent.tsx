import { SelectFormField, TextFormField } from "@/features/shared/shared";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { LineForm } from "@/features/lines/lines";

type Props = {
    register: UseFormRegister<LineForm>;
    errors: FieldErrors<LineForm>;
    control: Control<LineForm, any>;
}

export function LineFormComponent({ register, errors, control }: Props) {
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
        </>
    )
}
