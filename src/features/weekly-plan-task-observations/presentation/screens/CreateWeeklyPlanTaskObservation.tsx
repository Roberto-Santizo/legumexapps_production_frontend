import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { WeeklyPlanTaskObservationFormComponent, weeklyPlanTaskObservationProvider, type WeeklyPlanTaskObservationForm } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateWeeklyPlanTaskObservation() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<WeeklyPlanTaskObservationForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanTaskObservationForm) => weeklyPlanTaskObservationProvider.createWeeklyPlanTaskObservation(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/observaciones');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: WeeklyPlanTaskObservationForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear Observación" subtitle="Registra una nueva observación" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <WeeklyPlanTaskObservationFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
