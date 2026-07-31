import type { WeeklyPlanTaskPackingMaterialItem } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { Trash2Icon } from "lucide-react";

type Props = {
    item: WeeklyPlanTaskPackingMaterialItem;
    index: number;
}

export function PackingMaterialItemByTaskComponent({ item, index }: Props) {
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

                <button
                    type="button"
                    title="Quitar material"
                    className="rounded-md p-2 text-red-500 hover:bg-red-50"
                >
                    <Trash2Icon className="size-4" />
                </button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700" htmlFor={`items.${index}.quantity`}>
                        Cantidad
                    </label>

                    <input
                        id={`items.${index}.quantity`}
                        name={`items.${index}.quantity`}
                        type="number"
                        step="any"
                        placeholder="0"
                        autoComplete="off"
                        defaultValue={item.quantity}
                        className="text_form_field"
                    />

                    <p className="text-red-400 text-xs"></p>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700" htmlFor={`items.${index}.lote`}>
                        Lote
                    </label>

                    <input
                        id={`items.${index}.lote`}
                        name={`items.${index}.lote`}
                        type="text"
                        placeholder="L-2026-07"
                        autoComplete="off"
                        defaultValue={item.lote}
                        className="text_form_field"
                    />

                    <p className="text-red-400 text-xs"></p>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700" htmlFor={`items.${index}.destination`}>
                        Destino
                    </label>

                    <input
                        id={`items.${index}.destination`}
                        name={`items.${index}.destination`}
                        type="text"
                        placeholder="Línea de producción"
                        autoComplete="off"
                        defaultValue={item.destination}
                        className="text_form_field"
                    />

                    <p className="text-red-400 text-xs"></p>
                </div>
            </div>

            <input type="hidden" name={`items.${index}.packing_material_id`} value={item.packing_material_id} readOnly />
        </div>
    );
}
