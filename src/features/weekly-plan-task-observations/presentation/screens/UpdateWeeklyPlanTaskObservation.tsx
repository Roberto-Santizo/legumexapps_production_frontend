import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { WeeklyPlanTaskObservationFormComponent, weeklyPlanTaskObservationProvider, type WeeklyPlanTaskObservationForm } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateWeeklyPlanTaskObservation() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getWeeklyPlanTaskObservationById', id],
        queryFn: () => weeklyPlanTaskObservationProvider.getWeeklyPlanTaskObservationById(id!)
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValues
    } = useForm<WeeklyPlanTaskObservationForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanTaskObservationForm) => weeklyPlanTaskObservationProvider.updateWeeklyPlanTaskObservationById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/observaciones');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { weekly_plan_task_id, observation } = data;
            setValues({ weekly_plan_task_id, observation });
        }
    }, [data]);

    const onSubmit = (payload: WeeklyPlanTaskObservationForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Observación" subtitle="Actualiza la información de la observación" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <WeeklyPlanTaskObservationFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
