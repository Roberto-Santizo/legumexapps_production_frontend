import { CustomFilledButton, CustomForm, Modal, useNotification } from "@/features/shared/shared";
import { DraftWeeklyPlanTaskFormComponent, draftWeeklyPlanTaskProvider, type DraftWeeklyPlanTaskForm } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type Props = {
    modal: boolean;
    closeModal: () => void;
    refetch: () => void;
    callback?: () => void;
}

export function ModalCreateDraftWeeklyPlanTask({ modal, closeModal, refetch, callback }: Props) {
    const notification = useNotification();
    const { id } = useParams();

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors },

    } = useForm<DraftWeeklyPlanTaskForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: DraftWeeklyPlanTaskForm) => draftWeeklyPlanTaskProvider.createDraftWeeklyPlanTask(payload),
        onSuccess: (message) => {
            notification.success(message);
            reset();
            closeModal();
            callback?.();
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: DraftWeeklyPlanTaskForm) => {
        payload.draft_weekly_plan_id = id!;
        mutate(payload);
    }

    return (
        <Modal modal={modal} closeModal={closeModal} title="Crear Tarea de Plan Semanal Draft">
            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <DraftWeeklyPlanTaskFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </Modal>
    )
}
