import { rawMaterialOptions, rawMaterialProvider } from "@/features/raw-materials/raw-materials";
import { SelectFormField, TextFormField } from "@/features/shared/shared";
import { useQuery } from "@tanstack/react-query";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { SkuRawMaterialForm } from "@/features/skus-raw-materials/skus-raw-materials";

type Props = {
    register: UseFormRegister<SkuRawMaterialForm>;
    errors: FieldErrors<SkuRawMaterialForm>;
    control: Control<SkuRawMaterialForm, any>;
}

export function SkuRawMaterialFormComponent({ register, errors, control }: Props) {
    const { data: rawMaterialsData } = useQuery({
        queryKey: ['getRawMaterialItems'],
        queryFn: () => rawMaterialProvider.getRawMaterialItems('', '')
    });

    if (rawMaterialsData) return (
        <>
            <TextFormField<SkuRawMaterialForm>
                name="percentage"
                label="Porcentaje"
                placeholder="Porcentaje"
                register={register}
                type="number"
                validation={{
                    required: 'El campo es requerido',
                    valueAsNumber: true,
                    min: { value: 0, message: 'El porcentaje mínimo es 0' },
                    max: { value: 1, message: 'El porcentaje máximo es 1' }
                }}
                errorMessage={errors.percentage?.message}
            />

            <SelectFormField<SkuRawMaterialForm>
                name="raw_material_id"
                label="Materia Prima"
                control={control}
                validation={{ required: 'El campo es requerido' }}
                options={rawMaterialOptions(rawMaterialsData.data)}
                errorMessage={errors.raw_material_id?.message}
            />
        </>
    )
}
