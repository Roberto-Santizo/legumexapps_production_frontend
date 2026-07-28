import { CustomFilledButton, CustomForm, Modal, useNotification } from "@/features/shared/shared";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { WeeklyPlanTaskFormComponent, weeklyPlanTaskProvider, type WeeklyPlanTaskForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

type Props = {
    modal: boolean;
    closeModal: () => void;
    refetch: () => void;
}

export function ModalCreateWeeklyPlanTask({ modal, closeModal, refetch }: Props) {
    const notification = useNotification();
    const { id } = useParams();

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors }
    } = useForm<WeeklyPlanTaskForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanTaskForm) => weeklyPlanTaskProvider.createWeeklyPlanTask(payload),
        onSuccess: (message) => {
            notification.success(message);
            reset();
            closeModal();
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: WeeklyPlanTaskForm) => {
        payload.weekly_plan_id = +id!;
        mutate(payload);
    }

    return (
        <Modal modal={modal} closeModal={closeModal} title="Crear Tarea de Plan Semanal">
            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <WeeklyPlanTaskFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </Modal>
    )
}
