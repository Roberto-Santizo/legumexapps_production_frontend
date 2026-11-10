import { PackingMaterialSelectFormField } from "@/features/packing-materials/packing-materials";
import { TextFormField, type Option } from "@/features/shared/shared";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { SkuPackingMaterialForm } from "@/features/sku-packing-materials/sku-packing-materials";

type Props = {
    register: UseFormRegister<SkuPackingMaterialForm>;
    errors: FieldErrors<SkuPackingMaterialForm>;
    control: Control<SkuPackingMaterialForm, any>;
    selectedPackingMaterial?: Option;
}

export function SkuPackingMaterialFormComponent({ register, errors, control, selectedPackingMaterial }: Props) {
    return (
        <>
            <PackingMaterialSelectFormField<SkuPackingMaterialForm>
                name="packing_material_id"
                control={control}
                validation={{ required: 'El campo es requerido' }}
                selectedOption={selectedPackingMaterial}
                errorMessage={errors.packing_material_id?.message}
            />

            <TextFormField<SkuPackingMaterialForm>
                name="lbs_per_item"
                label="Libras por Item"
                placeholder="Libras por item"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.lbs_per_item?.message}
            />
        </>
    )
}
