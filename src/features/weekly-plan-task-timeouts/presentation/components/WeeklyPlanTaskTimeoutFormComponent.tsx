import { SelectFormField, TextAreaFormField } from "@/features/shared/shared";
import { timeoutOptions, timeoutProvider } from "@/features/timeouts/timeouts";
import { toNullableText, type WeeklyPlanTaskTimeoutForm } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";
import { useQuery } from "@tanstack/react-query";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
    register: UseFormRegister<WeeklyPlanTaskTimeoutForm>;
    errors: FieldErrors<WeeklyPlanTaskTimeoutForm>;
    control: Control<WeeklyPlanTaskTimeoutForm>;
}

export function WeeklyPlanTaskTimeoutFormComponent({ register, errors, control }: Props) {
    const { data, isLoading } = useQuery({
        queryKey: ['getTimeouts'],
        queryFn: () => timeoutProvider.getTimeouts('', '')
    });

    if (isLoading) return (
        <div className="h-32 animate-pulse rounded-xl bg-canvas motion-reduce:animate-none" />
    )

    return (
        <>
            <SelectFormField<WeeklyPlanTaskTimeoutForm>
                name="timeout_id"
                label="Tipo de tiempo muerto"
                control={control}
                validation={{ required: 'El tipo de tiempo muerto es obligatorio' }}
                options={timeoutOptions(data?.data ?? [])}
                errorMessage={errors.timeout_id?.message}
            />

            <TextAreaFormField<WeeklyPlanTaskTimeoutForm>
                label="Observación"
                name="observation"
                placeholder="Opcional. Ej. Se trabó la banda transportadora"
                register={register}
                validation={{
                    setValueAs: toNullableText,
                    validate: (value) => value === null || String(value).length <= 500 || 'La observación no puede superar los 500 caracteres'
                }}
                errorMessage={errors.observation?.message}
            />
        </>
    )
}
