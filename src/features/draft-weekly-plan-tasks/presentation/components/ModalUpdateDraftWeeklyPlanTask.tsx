import { CustomFilledButton, CustomForm, Modal, useNotification } from "@/features/shared/shared";
import { DraftWeeklyPlanTaskFormComponent, draftWeeklyPlanTaskProvider, type DraftWeeklyPlanTaskForm } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type Props = {
    modal: boolean;
    closeModal: () => void;
    taskId: string;
    callback?: () => void;
}

export function ModalUpdateDraftWeeklyPlanTask({ modal, closeModal, taskId, callback }: Props) {
    const notification = useNotification();
    const { id } = useParams();

    const { data } = useQuery({
        queryKey: ['getDraftWeeklyPlanTaskById', taskId],
        queryFn: () => draftWeeklyPlanTaskProvider.getDraftWeeklyPlanTaskById(taskId),
        enabled: !!taskId
    });

    const {
        handleSubmit,
        register,
        control,
        setValues,
        formState: { errors }
    } = useForm<DraftWeeklyPlanTaskForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: DraftWeeklyPlanTaskForm) => draftWeeklyPlanTaskProvider.updateDraftWeeklyPlanTaskById(taskId, payload),
        onSuccess: (message) => {
            notification.success(message);
            closeModal();
            callback?.();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { boxes, destination, operation_date, sku_id, line_id } = data;
            setValues({ boxes, destination, operation_date, sku_id, line_id });
        }
    }, [data]);

    const onSubmit = (payload: DraftWeeklyPlanTaskForm) => {
        payload.draft_weekly_plan_id = id!;
        mutate(payload);
    }

    return (
        <Modal modal={modal} closeModal={closeModal} title="Editar Tarea de Plan Semanal Draft">
            {data && (
                <CustomForm onSubmit={handleSubmit(onSubmit)}>
                    <DraftWeeklyPlanTaskFormComponent register={register} errors={errors} control={control} />
                    <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
                </CustomForm>
            )}
        </Modal>
    )
}
