import { packingMaterialOptions, packingMaterialProvider } from "@/features/packing-materials/packing-materials";
import { SelectFormField, TextFormField } from "@/features/shared/shared";
import { useQuery } from "@tanstack/react-query";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { SkuPackingMaterialForm } from "@/features/sku-packing-materials/sku-packing-materials";

type Props = {
    register: UseFormRegister<SkuPackingMaterialForm>;
    errors: FieldErrors<SkuPackingMaterialForm>;
    control: Control<SkuPackingMaterialForm, any>;
}

export function SkuPackingMaterialFormComponent({ register, errors, control }: Props) {
    const { data: packingMaterialsData } = useQuery({
        queryKey: ['getPackingMaterialItems'],
        queryFn: () => packingMaterialProvider.getPackingMaterialItems('', '')
    });

    if (packingMaterialsData) return (
        <>
            <TextFormField<SkuPackingMaterialForm>
                name="lbs_per_item"
                label="Libras por Item"
                placeholder="Libras por item"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.lbs_per_item?.message}
            />

            <SelectFormField<SkuPackingMaterialForm>
                name="packing_material_id"
                label="Material de Empaque"
                control={control}
                validation={{ required: 'El campo es requerido' }}
                options={packingMaterialOptions(packingMaterialsData.data)}
                errorMessage={errors.packing_material_id?.message}
            />
        </>
    )
}
