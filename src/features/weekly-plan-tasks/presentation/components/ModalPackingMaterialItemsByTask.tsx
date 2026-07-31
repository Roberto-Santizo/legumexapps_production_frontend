import { CustomFilledButton, CustomForm, getQueryParam, handleDeleteQueryParam, Modal, queryParamExists, TextAreaFormField, TextFormField, useNotification } from "@/features/shared/shared";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { PackingMaterialItemByTaskComponent, weeklyPlanTaskProvider, type PackingMaterialItemsByTaskDeliveryForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { packingMaterialTransactionProvider, type PackingMaterialTransactionCreateForm } from "@/features/packing-material-transactions/packing-material-transactions";

const signatures = [
    { name: "responsable_signature", label: "Firma del Responsable" },
    { name: "user_signature", label: "Firma de Bodega" }
];

const SIGNATURE_PLACEHOLDER = "signatures/signature.png";

export function ModalPackingMaterialItemsByTask() {
    const location = useLocation();
    const navigate = useNavigate();
    const notification = useNotification();
    const queryClient = useQueryClient();
    const taskId = getQueryParam(location, 'taskId');
    const show = queryParamExists(location, 'taskId');

    const { data } = useQuery({
        queryKey: ['getPackingMaterialItemsByTaskId', taskId],
        queryFn: () => weeklyPlanTaskProvider.getPackingMaterialItemsByTaskId(taskId!),
        enabled: !!taskId
    });

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<PackingMaterialItemsByTaskDeliveryForm>({
        defaultValues: { type: 1, items: [] }
    });

    const closeModal = () => {
        handleDeleteQueryParam(location, navigate, 'taskId');
    }

    useEffect(() => {
        if (!show) {
            reset({ reference: "", responsable: "", observations: "", type: 1, items: [] });
            return;
        }

        if (data) {
            reset({
                reference: "",
                responsable: "",
                observations: "",
                type: 1,
                items: data.map(({ quantity, lote, destination, packing_material_id }) => ({
                    quantity,
                    lote,
                    destination,
                    packing_material_id
                }))
            });
        }
    }, [show, data, reset]);

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: PackingMaterialTransactionCreateForm) => packingMaterialTransactionProvider.createPackingMaterialTransaction(payload),
        onSuccess: (message) => {
            notification.success(message);
            queryClient.invalidateQueries({ queryKey: ['getPackingMaterialItemsByTaskId', taskId] });
            closeModal();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (form: PackingMaterialItemsByTaskDeliveryForm) => {
        if (!taskId) return;

        mutate({
            ...form,
            weekly_plan_task_id: Number(taskId),
            responsable_signature: SIGNATURE_PLACEHOLDER,
            user_signature: SIGNATURE_PLACEHOLDER
        });
    }

    if (data) return (
        <Modal closeModal={() => closeModal()} modal={show} title="Entrega Material de Empaque" width="sm:max-w-4xl">
            <CustomForm onSubmit={handleSubmit(onSubmit)} className="border-none p-0 shadow-none">
                <section className="flex flex-col gap-4">
                    <h3 className="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-900">
                        Datos de la Entrega
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <TextFormField<PackingMaterialItemsByTaskDeliveryForm>
                            label="Referencia"
                            name="reference"
                            type="text"
                            placeholder="REQ-00123"
                            register={register}
                            validation={{ required: 'El campo es requerido' }}
                            errorMessage={errors.reference?.message}
                        />

                        <TextFormField<PackingMaterialItemsByTaskDeliveryForm>
                            label="Responsable"
                            name="responsable"
                            type="text"
                            placeholder="Nombre de quien recibe"
                            register={register}
                            validation={{ required: 'El campo es requerido' }}
                            errorMessage={errors.responsable?.message}
                        />

                        <div className="sm:col-span-2">
                            <TextAreaFormField<PackingMaterialItemsByTaskDeliveryForm>
                                label="Observaciones"
                                name="observations"
                                placeholder="Entrega parcial, material dañado, etc."
                                register={register}
                                validation={{}}
                                errorMessage={errors.observations?.message}
                            />
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                        <h3 className="text-sm font-semibold text-gray-900">
                            Materiales a Entregar
                        </h3>

                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                            {data.length} materiales
                        </span>
                    </div>

                    <div className="space-y-3">
                        {data.length === 0 && (
                            <p className="text-center font-light">La tarea no tiene materiales de empaque asignados</p>
                        )}

                        {data.map((item, index) => (
                            <PackingMaterialItemByTaskComponent
                                key={item.packing_material_id}
                                item={item}
                                index={index}
                                register={register}
                                errors={errors}
                            />
                        ))}
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <h3 className="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-900">
                        Firmas
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {signatures.map(signature => (
                            <div key={signature.name} className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    {signature.label}
                                </label>

                                <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-500">
                                    Toque para firmar
                                </div>

                                <p className="text-red-400 text-xs"></p>
                            </div>
                        ))}
                    </div>
                </section>

                <CustomFilledButton
                    type="submit"
                    label="Registrar Entrega"
                    disabled={isPending || data.length === 0}
                    fullWitdh
                />
            </CustomForm>
        </Modal>
    )
}
