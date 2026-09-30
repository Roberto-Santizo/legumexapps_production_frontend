import { TextFormField } from "@/features/shared/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { PackingMaterialTransactionUpdateForm } from "@/features/packing-material-transactions/packing-material-transactions";

type Props = {
    register: UseFormRegister<PackingMaterialTransactionUpdateForm>;
    errors: FieldErrors<PackingMaterialTransactionUpdateForm>;
}

export function PackingMaterialTransactionUpdateFormComponent({ register, errors }: Props) {
    return (
        <>
            <TextFormField<PackingMaterialTransactionUpdateForm>
                name="reference"
                label="Referencia"
                placeholder="Referencia de la transacción"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.reference?.message}
            />

            <TextFormField<PackingMaterialTransactionUpdateForm>
                name="responsable"
                label="Responsable"
                placeholder="Nombre del responsable"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.responsable?.message}
            />

            <TextFormField<PackingMaterialTransactionUpdateForm>
                name="observations"
                label="Observaciones"
                placeholder="Observaciones de la transacción"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.observations?.message}
            />
        </>
    )
}
