import { TextFormField } from "@/features/shared/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { WeeklyPlanTaskObservationForm } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";

type Props = {
    register: UseFormRegister<WeeklyPlanTaskObservationForm>;
    errors: FieldErrors<WeeklyPlanTaskObservationForm>;
}

export function WeeklyPlanTaskObservationFormComponent({ register, errors }: Props) {
    return (
        <>
            <TextFormField<WeeklyPlanTaskObservationForm>
                name="weekly_plan_task_id"
                label="Tarea"
                placeholder="Id de la tarea"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.weekly_plan_task_id?.message}
            />

            <TextFormField<WeeklyPlanTaskObservationForm>
                name="observation"
                label="Observación"
                placeholder="Observación de la tarea"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.observation?.message}
            />
        </>
    )
}
