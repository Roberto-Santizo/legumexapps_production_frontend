import { TextFormField } from "@/features/shared/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { PackingMaterialItemForm } from "@/features/packing-materials/packing-materials";

type Props = {
    register: UseFormRegister<PackingMaterialItemForm>;
    errors: FieldErrors<PackingMaterialItemForm>;
}

export function PackingMaterialFormComponent({ register, errors }: Props) {
    return (
        <>
            <TextFormField<PackingMaterialItemForm>
                name="name"
                label="Nombre"
                placeholder="Nombre del item"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.name?.message}
            />

            <TextFormField<PackingMaterialItemForm>
                name="code"
                label="Código"
                placeholder="Código del item"
                register={register}
                type="text"
                validation={{
                    required: 'El campo es requerido',
                    pattern: {
                        value: /^[A-Z0-9_-]+$/,
                        message: 'Solo se permiten letras mayúsculas, números, "-" y "_"'
                    },
                }}
                errorMessage={errors.code?.message}
            />

            <TextFormField<PackingMaterialItemForm>
                name="description"
                label="Descripción"
                placeholder="Descripción del item"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.description?.message}
            />

        </>
    )
}
