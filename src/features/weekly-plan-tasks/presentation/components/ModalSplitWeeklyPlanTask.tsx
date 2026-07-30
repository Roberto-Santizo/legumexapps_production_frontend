import { CustomFilledButton, CustomForm, Modal, useNotification } from "@/features/shared/shared";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { weeklyPlanTaskProvider, type SplitWeeklyPlanTaskForm, type WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useMutation } from "@tanstack/react-query";

type Props = {
    modal: boolean;
    closeModal: () => void;
    task: WeeklyPlanTask | null;
    callback?: () => void;
}

const emptyPortion = { boxes: 0, operation_date: "" };

export function ModalSplitWeeklyPlanTask({ modal, closeModal, task, callback }: Props) {
    const notification = useNotification();

    const {
        handleSubmit,
        register,
        control,
        reset,
        watch,
        formState: { errors }
    } = useForm<SplitWeeklyPlanTaskForm>({
        defaultValues: { task_id: task?.id, portions: [emptyPortion, emptyPortion] }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "portions" });
    const portions = watch("portions");
    const boxesSum = portions?.reduce((sum, portion) => sum + (Number(portion?.boxes) || 0), 0) ?? 0;

    useEffect(() => {
        if (modal && task) {
            reset({ task_id: task.id, portions: [emptyPortion, emptyPortion] });
        }

        if (!modal) {
            reset({ task_id: undefined, portions: [emptyPortion, emptyPortion] });
        }
    }, [modal, task, reset]);

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: SplitWeeklyPlanTaskForm) => weeklyPlanTaskProvider.splitWeeklyPlanTask(payload),
        onSuccess: (message) => {
            notification.success(message);
            closeModal();
            callback?.();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: SplitWeeklyPlanTaskForm) => {
        if (!task) return;

        mutate({
            task_id: task.id,
            portions: payload.portions.map((portion) => ({
                boxes: Number(portion.boxes),
                operation_date: portion.operation_date
            }))
        });
    }

    if (!task) return null;

    const sumMismatch = boxesSum !== task.boxes;

    return (
        <Modal modal={modal} closeModal={closeModal} title={`Dividir Tarea - ${task.sku_name}`} width="sm:max-w-2xl">
            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-start gap-3 rounded-xl border border-gray-200 p-4">
                            <div className="flex flex-col gap-2 flex-1">
                                <label className="text-sm font-medium text-gray-700">Cajas</label>
                                <input
                                    {...register(`portions.${index}.boxes`, {
                                        required: 'El campo es requerido',
                                        min: { value: 1, message: 'Debe ser al menos 1' },
                                        valueAsNumber: true
                                    })}
                                    type="number"
                                    placeholder="Cantidad de cajas"
                                    autoComplete="off"
                                    className={errors.portions?.[index]?.boxes ? 'text_form_field_error' : 'text_form_field'}
                                />
                                <p className="text-red-400 text-xs">{errors.portions?.[index]?.boxes?.message}</p>
                            </div>

                            <div className="flex flex-col gap-2 flex-1">
                                <label className="text-sm font-medium text-gray-700">Fecha de Operación</label>
                                <input
                                    {...register(`portions.${index}.operation_date`, { required: 'El campo es requerido' })}
                                    type="date"
                                    className={`text_form_field ${errors.portions?.[index]?.operation_date ? "text_form_field_error" : ""}`}
                                />
                                <p className="text-red-400 text-xs">{errors.portions?.[index]?.operation_date?.message}</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => remove(index)}
                                disabled={fields.length <= 2}
                                className="mt-8 rounded-md p-2 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
                            >
                                <Trash2Icon className="size-4" />
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => append(emptyPortion)}
                    className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-800"
                >
                    <PlusIcon className="size-4" />
                    Agregar Porción
                </button>

                <div className={`rounded-xl p-4 text-sm font-medium ${sumMismatch ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
                    Suma: {boxesSum} / {task.boxes} cajas
                </div>

                <CustomFilledButton
                    type="submit"
                    label="Dividir Tarea"
                    disabled={isPending}
                    fullWitdh
                />
            </CustomForm>
        </Modal>
    )
}
