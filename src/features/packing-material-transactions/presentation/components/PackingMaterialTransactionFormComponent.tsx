import { CustomFilledButton, TextFormField } from "@/features/shared/shared";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import type { PackingMaterialTransactionCreateForm } from "@/features/packing-material-transactions/packing-material-transactions";

type Props = {
    register: UseFormRegister<PackingMaterialTransactionCreateForm>;
    errors: FieldErrors<PackingMaterialTransactionCreateForm>;
    control: Control<PackingMaterialTransactionCreateForm>;
}

const emptyItem = { quantity: 0, lote: "", destination: "", packing_material_id: 0 };

export function PackingMaterialTransactionFormComponent({ register, errors, control }: Props) {
    const { fields, append, remove } = useFieldArray({ control, name: "items" });

    return (
        <>
            <TextFormField<PackingMaterialTransactionCreateForm>
                name="reference"
                label="Referencia"
                placeholder="Referencia de la transacción"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.reference?.message}
            />

            <TextFormField<PackingMaterialTransactionCreateForm>
                name="responsable"
                label="Responsable"
                placeholder="Nombre del responsable"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.responsable?.message}
            />

            <TextFormField<PackingMaterialTransactionCreateForm>
                name="observations"
                label="Observaciones"
                placeholder="Observaciones de la transacción"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.observations?.message}
            />

            <TextFormField<PackingMaterialTransactionCreateForm>
                name="responsable_signature"
                label="Firma del Responsable"
                placeholder="Ruta de la firma del responsable"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.responsable_signature?.message}
            />

            <TextFormField<PackingMaterialTransactionCreateForm>
                name="user_signature"
                label="Firma del Usuario"
                placeholder="Ruta de la firma del usuario"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.user_signature?.message}
            />

            <TextFormField<PackingMaterialTransactionCreateForm>
                name="type"
                label="Tipo"
                placeholder="Tipo de transacción"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.type?.message}
            />

            <TextFormField<PackingMaterialTransactionCreateForm>
                name="weekly_plan_task_id"
                label="Tarea del Plan Semanal"
                placeholder="Id de la tarea del plan semanal"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.weekly_plan_task_id?.message}
            />

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700">Items</p>
                    <CustomFilledButton
                        label="Agregar Item"
                        type="button"
                        icon={<PlusIcon />}
                        onClick={() => append(emptyItem)}
                    />
                </div>

                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-3 rounded-xl border border-gray-200 p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                            <TextFormField<PackingMaterialTransactionCreateForm>
                                name={`items.${index}.packing_material_id`}
                                label="Material de Empaque"
                                placeholder="Id del material de empaque"
                                register={register}
                                type="number"
                                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                                errorMessage={errors.items?.[index]?.packing_material_id?.message}
                            />

                            <TextFormField<PackingMaterialTransactionCreateForm>
                                name={`items.${index}.quantity`}
                                label="Cantidad"
                                placeholder="Cantidad"
                                register={register}
                                type="number"
                                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                                errorMessage={errors.items?.[index]?.quantity?.message}
                            />

                            <TextFormField<PackingMaterialTransactionCreateForm>
                                name={`items.${index}.lote`}
                                label="Lote"
                                placeholder="Lote"
                                register={register}
                                type="text"
                                validation={{ required: 'El campo es requerido' }}
                                errorMessage={errors.items?.[index]?.lote?.message}
                            />

                            <TextFormField<PackingMaterialTransactionCreateForm>
                                name={`items.${index}.destination`}
                                label="Destino"
                                placeholder="Destino"
                                register={register}
                                type="text"
                                validation={{}}
                                errorMessage={errors.items?.[index]?.destination?.message}
                            />
                        </div>

                        <button
                            type="button"
                            className="mt-8 text-red-400 hover:text-red-500"
                            onClick={() => remove(index)}
                        >
                            <Trash2Icon />
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}
