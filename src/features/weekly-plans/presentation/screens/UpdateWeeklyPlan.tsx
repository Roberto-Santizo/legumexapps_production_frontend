import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { WeeklyPlanFormComponent, weeklyPlanProvider, type WeeklyPlanForm } from "@/features/weekly-plans/weekly-plans";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateWeeklyPlan() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getWeeklyPlanById', id],
        queryFn: () => weeklyPlanProvider.getWeeklyPlanById(id!)
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValues
    } = useForm<WeeklyPlanForm>();


    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanForm) => weeklyPlanProvider.updateWeeklyPlanById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/planes-semanales');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { id, ...rest } = data;
            setValues(rest);
        }
    }, [data]);


    const onSubmit = (payload: WeeklyPlanForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Plan Semanal" subtitle="Actualiza la información del plan semanal" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <WeeklyPlanFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
