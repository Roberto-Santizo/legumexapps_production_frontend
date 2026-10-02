import { CustomFilledButton, CustomForm, Modal, TextFormField, useNotification } from "@/features/shared/shared";
import { EndTaskSummary, toFiniteNumber, weeklyPlanTaskProvider, type WeeklyPlanTask, type WeeklyPlanTaskEndForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useForm, useWatch } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
    modal: boolean;
    closeModal: () => void;
    refetch: () => void;
    task: WeeklyPlanTask;
}

export function ModalEndWeeklyPlanTask({ modal, closeModal, refetch, task }: Props) {
    const notification = useNotification();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        control,
        formState: { errors }
    } = useForm<WeeklyPlanTaskEndForm>();

    const producedBoxes = toFiniteNumber(useWatch({ control, name: 'produced_boxes' }));

    useEffect(() => {
        if (modal && task.recorded_pounds > 0) setValue('weighed_pounds', task.recorded_pounds);
    }, [modal, task.recorded_pounds, setValue]);

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanTaskEndForm) => weeklyPlanTaskProvider.endWeeklyPlanTask(String(task.id), payload),
        onSuccess: (message) => {
            notification.success(message);
            reset();
            closeModal();
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
            refetch();
        }
    });

    const onSubmit = (payload: WeeklyPlanTaskEndForm) =>
        notification.question('¿Desea cerrar la tarea?', 'Cerrar Tarea', 'La producción registrada no se podrá modificar después', () => mutate(payload));

    return (
        <Modal modal={modal} closeModal={closeModal} title="Cerrar Tarea" width="sm:max-w-lg">
            <div className="space-y-5">
                <EndTaskSummary task={task} producedBoxes={producedBoxes} />

                <CustomForm onSubmit={handleSubmit(onSubmit)}>
                    <TextFormField<WeeklyPlanTaskEndForm>
                        label="Cajas producidas"
                        name="produced_boxes"
                        type="number"
                        placeholder="Ej. 240"
                        register={register}
                        validation={{
                            required: 'Las cajas producidas son obligatorias',
                            valueAsNumber: true,
                            validate: {
                                integer: (value) => Number.isInteger(value) || 'Las cajas producidas deben ser un número entero',
                                positive: (value) => value >= 0 || 'Las cajas producidas no pueden ser negativas'
                            }
                        }}
                        errorMessage={errors.produced_boxes?.message}
                    />

                    <TextFormField<WeeklyPlanTaskEndForm>
                        label="Libras pesadas"
                        name="weighed_pounds"
                        type="number"
                        placeholder="Ej. 1925.5"
                        register={register}
                        validation={{
                            required: 'Las libras pesadas son obligatorias',
                            valueAsNumber: true,
                            validate: {
                                numeric: (value) => Number.isFinite(value) || 'Las libras pesadas deben ser un valor numérico',
                                positive: (value) => value >= 0 || 'Las libras pesadas no pueden ser negativas'
                            }
                        }}
                        errorMessage={errors.weighed_pounds?.message}
                    />

                    <CustomFilledButton type="submit" label="Cerrar Tarea" disabled={isPending} />
                </CustomForm>
            </div>
        </Modal>
    )
}
