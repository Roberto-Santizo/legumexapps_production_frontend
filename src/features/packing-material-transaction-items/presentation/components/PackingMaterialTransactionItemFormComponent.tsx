import { TextFormField } from "@/features/shared/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { PackingMaterialTransactionItemForm } from "@/features/packing-material-transaction-items/packing-material-transaction-items";

type Props = {
    register: UseFormRegister<PackingMaterialTransactionItemForm>;
    errors: FieldErrors<PackingMaterialTransactionItemForm>;
}

export function PackingMaterialTransactionItemFormComponent({ register, errors }: Props) {
    return (
        <>
            <TextFormField<PackingMaterialTransactionItemForm>
                name="packing_material_id"
                label="Material de Empaque"
                placeholder="Id del material de empaque"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.packing_material_id?.message}
            />

            <TextFormField<PackingMaterialTransactionItemForm>
                name="quantity"
                label="Cantidad"
                placeholder="Cantidad"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.quantity?.message}
            />

            <TextFormField<PackingMaterialTransactionItemForm>
                name="lote"
                label="Lote"
                placeholder="Lote"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.lote?.message}
            />

            <TextFormField<PackingMaterialTransactionItemForm>
                name="destination"
                label="Destino"
                placeholder="Destino"
                register={register}
                type="text"
                validation={{}}
                errorMessage={errors.destination?.message}
            />
        </>
    )
}
