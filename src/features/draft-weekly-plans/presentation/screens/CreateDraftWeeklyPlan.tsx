import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { DraftWeeklyPlanFormComponent, draftWeeklyPlanProvider, type DraftWeeklyPlanForm } from "@/features/draft-weekly-plans/draft-weekly-plans";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateDraftWeeklyPlan() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<DraftWeeklyPlanForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: DraftWeeklyPlanForm) => draftWeeklyPlanProvider.createDraftWeeklyPlan(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/draft-planes-semanales');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: DraftWeeklyPlanForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear Plan Semanal Borrador" subtitle="Registra un nuevo plan semanal borrador" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <DraftWeeklyPlanFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
