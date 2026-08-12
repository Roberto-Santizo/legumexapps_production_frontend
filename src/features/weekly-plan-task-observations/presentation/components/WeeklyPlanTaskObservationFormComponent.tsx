import { TextAreaFormField, TextFormField } from "@/features/shared/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { WeeklyPlanTaskObservationForm } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";

type Props = {
    register: UseFormRegister<WeeklyPlanTaskObservationForm>;
    errors: FieldErrors<WeeklyPlanTaskObservationForm>;
    showTaskField?: boolean;
}

export function WeeklyPlanTaskObservationFormComponent({ register, errors, showTaskField = true }: Props) {
    return (
        <>
            {showTaskField && (
                <TextFormField<WeeklyPlanTaskObservationForm>
                    name="weekly_plan_task_id"
                    label="Tarea"
                    placeholder="Id de la tarea"
                    register={register}
                    type="number"
                    validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                    errorMessage={errors.weekly_plan_task_id?.message}
                />
            )}

            <TextAreaFormField<WeeklyPlanTaskObservationForm>
                name="observation"
                label="Observación"
                placeholder="Paro de línea por falta de tarima, 20 min."
                rows={5}
                register={register}
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.observation?.message}
            />
        </>
    )
}
