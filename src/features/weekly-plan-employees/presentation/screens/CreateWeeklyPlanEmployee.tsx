import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { assertWeeklyPlanEmployeeAvailability, WeeklyPlanEmployeeFormComponent, weeklyPlanEmployeeProvider, type WeeklyPlanEmployeeForm } from "@/features/weekly-plan-employees/weekly-plan-employees";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function CreateWeeklyPlanEmployee() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm<WeeklyPlanEmployeeForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: async (payload: WeeklyPlanEmployeeForm) => {
            await assertWeeklyPlanEmployeeAvailability(payload);
            return weeklyPlanEmployeeProvider.createWeeklyPlanEmployee(payload);
        },
        onSuccess: (message) => {
            notification.success(message);
            navigate('/empleados-planes-semanales');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: WeeklyPlanEmployeeForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Asignar Empleado" subtitle="Asigna un empleado a una posición dentro de un plan semanal" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <WeeklyPlanEmployeeFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Asignar" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
