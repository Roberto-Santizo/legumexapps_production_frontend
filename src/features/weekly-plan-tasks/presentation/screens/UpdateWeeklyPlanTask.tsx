import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { WeeklyPlanTaskFormComponent, weeklyPlanTaskProvider, type WeeklyPlanTaskForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateWeeklyPlanTask() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getWeeklyPlanTaskById', id],
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(id!)
    });

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValues
    } = useForm<WeeklyPlanTaskForm>();


    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanTaskForm) => weeklyPlanTaskProvider.updateWeeklyPlanTaskById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/planes-semanales-tareas');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { boxes, destination, operation_date, weekly_plan_id, line_sku_id } = data;
            setValues({ boxes, destination, operation_date, weekly_plan_id, line_sku_id });
        }
    }, [data]);


    const onSubmit = (payload: WeeklyPlanTaskForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Tarea de Plan Semanal" subtitle="Actualiza la información de la tarea del plan semanal" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <WeeklyPlanTaskFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
