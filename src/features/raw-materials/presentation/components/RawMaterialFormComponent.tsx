import { TextFormField } from "@/features/shared/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { RawMaterialItemForm } from "@/features/raw-materials/raw-materials";

type Props = {
    register: UseFormRegister<RawMaterialItemForm>;
    errors: FieldErrors<RawMaterialItemForm>;
}

export function RawMaterialFormComponent({ register, errors }: Props) {
    return (
        <>
            <TextFormField<RawMaterialItemForm>
                name="code"
                label="Código"
                placeholder="Código de la materia prima"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.code?.message}
            />

            <TextFormField<RawMaterialItemForm>
                name="product_name"
                label="Nombre del Producto"
                placeholder="Nombre del producto"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.product_name?.message}
            />
        </>
    )
}
