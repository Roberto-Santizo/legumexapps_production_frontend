import { CustomFilledButton, CustomForm, ErrorComponent, Loading, Title, useNotification } from "@/features/shared/shared";
import { assertWeeklyPlanEmployeeAvailability, toWeeklyPlanEmployeeFormValues, WeeklyPlanEmployeeFormComponent, weeklyPlanEmployeeProvider, type WeeklyPlanEmployeeForm } from "@/features/weekly-plan-employees/weekly-plan-employees";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateWeeklyPlanEmployee() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getWeeklyPlanEmployeeById', id],
        queryFn: () => weeklyPlanEmployeeProvider.getWeeklyPlanEmployeeById(id!),
        retry: false
    });

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors }
    } = useForm<WeeklyPlanEmployeeForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: async (payload: WeeklyPlanEmployeeForm) => {
            await assertWeeklyPlanEmployeeAvailability(payload, Number(id));
            return weeklyPlanEmployeeProvider.updateWeeklyPlanEmployeeById(id!, payload);
        },
        onSuccess: (message) => {
            notification.success(message);
            queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanEmployeeById', id] });
            navigate('/empleados-planes-semanales');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) reset(toWeeklyPlanEmployeeFormValues(data));
    }, [data, reset]);

    const onSubmit = (payload: WeeklyPlanEmployeeForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Asignación" subtitle={`${data.code} · ${data.name} — selecciona de nuevo el plan semanal de la asignación`} />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <WeeklyPlanEmployeeFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
