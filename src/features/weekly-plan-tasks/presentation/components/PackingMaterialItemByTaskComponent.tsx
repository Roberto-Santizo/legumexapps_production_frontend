import { TextFormField } from "@/features/shared/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { PackingMaterialItemsByTaskDeliveryForm, WeeklyPlanTaskPackingMaterialItem } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

type Props = {
    item: WeeklyPlanTaskPackingMaterialItem;
    index: number;
    register: UseFormRegister<PackingMaterialItemsByTaskDeliveryForm>;
    errors: FieldErrors<PackingMaterialItemsByTaskDeliveryForm>;
}

export function PackingMaterialItemByTaskComponent({ item, index, register, errors }: Props) {
    const itemErrors = errors.items?.[index];

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                        {item.packing_material_name}
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                        {item.packing_material_code} · {item.lbs_per_item} lbs por unidad
                    </p>
                </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <TextFormField<PackingMaterialItemsByTaskDeliveryForm>
                    label="Cantidad"
                    name={`items.${index}.quantity`}
                    type="number"
                    placeholder="0"
                    register={register}
                    validation={{
                        required: 'El campo es requerido',
                        min: { value: 1, message: 'Debe ser al menos 1' },
                        valueAsNumber: true
                    }}
                    errorMessage={itemErrors?.quantity?.message}
                    disabled={true}
                />

                <TextFormField<PackingMaterialItemsByTaskDeliveryForm>
                    label="Lote"
                    name={`items.${index}.lote`}
                    type="text"
                    placeholder="L-2026-07"
                    register={register}
                    validation={{ required: 'El campo es requerido' }}
                    errorMessage={itemErrors?.lote?.message}
                />

                <TextFormField<PackingMaterialItemsByTaskDeliveryForm>
                    label="Destino"
                    name={`items.${index}.destination`}
                    type="text"
                    placeholder="Línea de producción"
                    register={register}
                    validation={{}}
                    errorMessage={itemErrors?.destination?.message}
                />
            </div>

            <input type="hidden" {...register(`items.${index}.packing_material_id`, { valueAsNumber: true })} />
        </div>
    );
}
