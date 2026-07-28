import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { WeeklyPlanFormComponent, weeklyPlanProvider, type WeeklyPlanForm } from "@/features/weekly-plans/weekly-plans";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateWeeklyPlan() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<WeeklyPlanForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanForm) => weeklyPlanProvider.createWeeklyPlan(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/planes-semanales');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: WeeklyPlanForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear Plan Semanal" subtitle="Registra un nuevo plan semanal" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <WeeklyPlanFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
