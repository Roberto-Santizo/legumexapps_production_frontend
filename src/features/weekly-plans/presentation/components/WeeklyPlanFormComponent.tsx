import { TextFormField } from "@/features/shared/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { WeeklyPlanForm } from "@/features/weekly-plans/weekly-plans";

type Props = {
    register: UseFormRegister<WeeklyPlanForm>;
    errors: FieldErrors<WeeklyPlanForm>;
}

export function WeeklyPlanFormComponent({ register, errors }: Props) {
    return (
        <>
            <TextFormField<WeeklyPlanForm>
                name="week"
                label="Semana"
                placeholder="Número de semana"
                register={register}
                type="number"
                validation={{
                    required: 'El campo es requerido',
                    valueAsNumber: true,
                    min: { value: 1, message: 'La semana debe estar entre 1 y 52' },
                    max: { value: 52, message: 'La semana debe estar entre 1 y 52' }
                }}
                errorMessage={errors.week?.message}
            />

            <TextFormField<WeeklyPlanForm>
                name="year"
                label="Año"
                placeholder="Año"
                register={register}
                type="number"
                validation={{
                    required: 'El campo es requerido',
                    valueAsNumber: true,
                    min: { value: 2025, message: 'El año debe estar entre 2025 y 2100' },
                    max: { value: 2100, message: 'El año debe estar entre 2025 y 2100' }
                }}
                errorMessage={errors.year?.message}
            />
        </>
    )
}
