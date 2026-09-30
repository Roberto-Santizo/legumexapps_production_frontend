import { CustomFilledButton, CustomForm, getQueryParam, handleDeleteQueryParam, Modal, queryParamExists, SignatureFormField, TextAreaFormField, TextFormField, useNotification } from "@/features/shared/shared";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { PackingMaterialItemByTaskComponent, weeklyPlanTaskProvider, type PackingMaterialItemsByTaskDeliveryForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { packingMaterialTransactionProvider, type PackingMaterialTransactionCreateForm } from "@/features/packing-material-transactions/packing-material-transactions";

const signatures = [
    { name: "responsable_signature", label: "Firma del Responsable", fileName: "responsable_signature.png", requiredMessage: "La firma del responsable es obligatoria" },
    { name: "user_signature", label: "Firma de Bodega", fileName: "user_signature.png", requiredMessage: "La firma de bodega es obligatoria" }
] as const;

const emptyDeliveryForm: PackingMaterialItemsByTaskDeliveryForm = {
    reference: "",
    responsable: "",
    observations: "",
    responsable_signature: null,
    user_signature: null,
    type: 1,
    items: []
};

export function ModalPackingMaterialItemsByTask() {
    const location = useLocation();
    const navigate = useNavigate();
    const notification = useNotification();
    const queryClient = useQueryClient();
    const taskId = getQueryParam(location, 'taskId');
    const show = queryParamExists(location, 'taskId');
    const date = getQueryParam(location, 'date')!;

    const { data } = useQuery({
        queryKey: ['getPackingMaterialItemsByTaskId', taskId],
        queryFn: () => weeklyPlanTaskProvider.getPackingMaterialItemsByTaskId(taskId!),
        enabled: !!taskId
    });

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors }
    } = useForm<PackingMaterialItemsByTaskDeliveryForm>({
        defaultValues: emptyDeliveryForm
    });

    const closeModal = () => {
        handleDeleteQueryParam(location, navigate, 'taskId');
    }

    useEffect(() => {
        if (!show) {
            reset(emptyDeliveryForm);
            return;
        }

        if (data) {
            reset({
                ...emptyDeliveryForm,
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
            queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTasksByDate', date] });
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
            weekly_plan_task_id: Number(taskId)
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
                            <SignatureFormField<PackingMaterialItemsByTaskDeliveryForm>
                                key={signature.name}
                                name={signature.name}
                                label={signature.label}
                                fileName={signature.fileName}
                                control={control}
                                disabled={isPending}
                                validation={{ required: signature.requiredMessage }}
                            />
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
