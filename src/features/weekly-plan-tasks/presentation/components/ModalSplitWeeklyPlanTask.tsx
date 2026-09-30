import { CustomFilledButton, Modal, useNotification } from "@/features/shared/shared";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { PlusIcon, SplitIcon } from "lucide-react";
import { getSplitAllocation, SplitAllocationMeter, SplitPortionRow, SplitTaskSummary, weeklyPlanTaskProvider, type SplitWeeklyPlanTaskForm, type WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
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

    const allocation = getSplitAllocation(portions, task.boxes);

    return (
        <Modal modal={modal} closeModal={closeModal} title="Dividir tarea" width="sm:max-w-2xl">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                <SplitTaskSummary task={task} />

                <section className="space-y-3">
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-sm font-semibold text-ink">Porciones</h3>
                        <p className="text-xs text-ink-subtle">Mínimo 2</p>
                    </div>

                    <ul className="space-y-2">
                        {fields.map((field, index) => (
                            <SplitPortionRow
                                key={field.id}
                                index={index}
                                register={register}
                                errors={errors}
                                canRemove={fields.length > 2}
                                onRemove={() => remove(index)}
                            />
                        ))}
                    </ul>

                    <button
                        type="button"
                        onClick={() => append(emptyPortion)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong py-2.5 text-sm font-medium text-ink-muted transition-colors duration-150 hover:border-ink/40 hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
                    >
                        <PlusIcon className="size-4" />
                        Agregar porción
                    </button>
                </section>

                <div className="space-y-4 rounded-xl bg-canvas p-4">
                    <SplitAllocationMeter allocation={allocation} total={task.boxes} />
                    <CustomFilledButton
                        type="submit"
                        label="Dividir tarea"
                        icon={isPending ? undefined : <SplitIcon className="size-4" />}
                        disabled={isPending}
                        fullWitdh
                    />
                </div>
            </form>
        </Modal>
    )
}
