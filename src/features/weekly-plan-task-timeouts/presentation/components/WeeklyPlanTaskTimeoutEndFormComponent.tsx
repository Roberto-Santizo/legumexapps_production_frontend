import { TextAreaFormField } from "@/features/shared/shared";
import { toNullableText, type WeeklyPlanTaskTimeoutEndForm } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
    register: UseFormRegister<WeeklyPlanTaskTimeoutEndForm>;
    errors: FieldErrors<WeeklyPlanTaskTimeoutEndForm>;
}

export function WeeklyPlanTaskTimeoutEndFormComponent({ register, errors }: Props) {
    return (
        <TextAreaFormField<WeeklyPlanTaskTimeoutEndForm>
            label="Observación"
            name="observation"
            placeholder="Opcional. Ej. Se cambió el rodillo"
            register={register}
            validation={{
                setValueAs: toNullableText,
                validate: (value) => value === null || value.length <= 500 || 'La observación no puede superar los 500 caracteres'
            }}
            errorMessage={errors.observation?.message}
        />
    )
}
