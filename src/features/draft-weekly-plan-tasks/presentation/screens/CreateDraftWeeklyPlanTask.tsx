import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { DraftWeeklyPlanTaskFormComponent, draftWeeklyPlanTaskProvider, type DraftWeeklyPlanTaskForm } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateDraftWeeklyPlanTask() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm<DraftWeeklyPlanTaskForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: DraftWeeklyPlanTaskForm) => draftWeeklyPlanTaskProvider.createDraftWeeklyPlanTask(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/draft-tareas-planes-semanales');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: DraftWeeklyPlanTaskForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear Tarea de Plan Semanal Draft" subtitle="Registra una nueva tarea de plan semanal draft" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <DraftWeeklyPlanTaskFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
