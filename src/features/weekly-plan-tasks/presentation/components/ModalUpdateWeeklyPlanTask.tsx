import { CustomFilledButton, CustomForm, Modal, useNotification } from "@/features/shared/shared";
import { WeeklyPlanTaskUpdateFormComponent, weeklyPlanTaskProvider, type WeeklyPlanTaskUpdateForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

type Props = {
    modal: boolean;
    closeModal: () => void;
    refetch: () => void;
    taskId: string;
}

export function ModalUpdateWeeklyPlanTask({ modal, closeModal, refetch, taskId }: Props) {
    const notification = useNotification();

    const { data } = useQuery({
        queryKey: ['getWeeklyPlanTaskById', taskId],
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(taskId),
        enabled: !!taskId
    });

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValues
    } = useForm<WeeklyPlanTaskUpdateForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanTaskUpdateForm) => weeklyPlanTaskProvider.updateWeeklyPlanTaskById(taskId, payload),
        onSuccess: (message) => {
            notification.success(message);
            closeModal();
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { boxes, produced_boxes, pallets, produced_pallets, hours, weighed_pounds, destination, operation_date, start_date, end_date, weekly_plan_id, line_sku_id } = data;
            setValues({ boxes, produced_boxes, pallets, produced_pallets, hours, weighed_pounds, destination, operation_date, start_date, end_date, weekly_plan_id, line_sku_id });
        }
    }, [data]);

    const onSubmit = (payload: WeeklyPlanTaskUpdateForm) => mutate(payload);

    return (
        <Modal modal={modal} closeModal={closeModal} title="Editar Tarea de Plan Semanal">
            {data && (
                <CustomForm onSubmit={handleSubmit(onSubmit)}>
                    <WeeklyPlanTaskUpdateFormComponent register={register} errors={errors} control={control} />
                    <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
                </CustomForm>
            )}
        </Modal>
    )
}
