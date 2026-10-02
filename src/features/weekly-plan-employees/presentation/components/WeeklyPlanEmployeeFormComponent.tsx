import { positionProvider } from "@/features/positions/positions";
import { SelectFormField, TextFormField } from "@/features/shared/shared";
import { weeklyPlanProvider } from "@/features/weekly-plans/weekly-plans";
import { toPositionOptions, toWeeklyPlanOptions, type WeeklyPlanEmployeeForm } from "@/features/weekly-plan-employees/weekly-plan-employees";
import { useQuery } from "@tanstack/react-query";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
    register: UseFormRegister<WeeklyPlanEmployeeForm>;
    errors: FieldErrors<WeeklyPlanEmployeeForm>;
    control: Control<WeeklyPlanEmployeeForm>;
}

export function WeeklyPlanEmployeeFormComponent({ register, errors, control }: Props) {
    const { data: weeklyPlans } = useQuery({
        queryKey: ['getWeeklyPlans'],
        queryFn: () => weeklyPlanProvider.getWeeklyPlans('', '')
    });

    const { data: positions } = useQuery({
        queryKey: ['getPositions'],
        queryFn: () => positionProvider.getPositions('', '')
    });

    return (
        <>
            <SelectFormField<WeeklyPlanEmployeeForm>
                name="weekly_plan_id"
                label="Plan semanal"
                control={control}
                validation={{ required: 'El plan semanal es requerido' }}
                options={toWeeklyPlanOptions(weeklyPlans?.data ?? [])}
                errorMessage={errors.weekly_plan_id?.message}
            />

            <SelectFormField<WeeklyPlanEmployeeForm>
                name="position_id"
                label="Posición"
                control={control}
                validation={{ required: 'La posición es requerida' }}
                options={toPositionOptions(positions?.data ?? [])}
                errorMessage={errors.position_id?.message}
            />

            <TextFormField<WeeklyPlanEmployeeForm>
                name="employee_id"
                label="ID del empleado"
                placeholder="ID del empleado en el biométrico"
                register={register}
                type="number"
                validation={{
                    required: 'El empleado es requerido',
                    valueAsNumber: true,
                    min: { value: 1, message: 'El empleado debe ser un número entero positivo' }
                }}
                errorMessage={errors.employee_id?.message}
            />
        </>
    )
}
