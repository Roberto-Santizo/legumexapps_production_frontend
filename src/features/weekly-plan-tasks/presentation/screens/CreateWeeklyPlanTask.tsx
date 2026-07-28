import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { WeeklyPlanTaskFormComponent, weeklyPlanTaskProvider, type WeeklyPlanTaskForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateWeeklyPlanTask() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm<WeeklyPlanTaskForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanTaskForm) => weeklyPlanTaskProvider.createWeeklyPlanTask(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/planes-semanales-tareas');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: WeeklyPlanTaskForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear Tarea de Plan Semanal" subtitle="Registra una nueva tarea de plan semanal" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <WeeklyPlanTaskFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
