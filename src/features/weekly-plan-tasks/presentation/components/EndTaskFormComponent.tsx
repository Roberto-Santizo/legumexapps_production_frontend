import { TextFormField } from "@/features/shared/shared";
import type { WeeklyPlanTaskEndForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
    register: UseFormRegister<WeeklyPlanTaskEndForm>;
    errors: FieldErrors<WeeklyPlanTaskEndForm>;
    wasteRequired: boolean;
}

export function EndTaskFormComponent({ register, errors, wasteRequired }: Props) {
    return (
        <>
            <TextFormField<WeeklyPlanTaskEndForm>
                label="Cajas producidas"
                name="produced_boxes"
                type="number"
                placeholder="Ej. 240"
                register={register}
                validation={{
                    required: 'Las cajas producidas son obligatorias',
                    valueAsNumber: true,
                    validate: {
                        integer: (value) => Number.isInteger(value) || 'Las cajas producidas deben ser un número entero',
                        positive: (value) => value >= 0 || 'Las cajas producidas no pueden ser negativas'
                    }
                }}
                errorMessage={errors.produced_boxes?.message}
            />

            <TextFormField<WeeklyPlanTaskEndForm>
                label="Libras pesadas"
                name="weighed_pounds"
                type="number"
                placeholder="Ej. 1925.5"
                register={register}
                validation={{
                    required: 'Las libras pesadas son obligatorias',
                    valueAsNumber: true,
                    validate: {
                        numeric: (value) => Number.isFinite(value) || 'Las libras pesadas deben ser un valor numérico',
                        positive: (value) => value >= 0 || 'Las libras pesadas no pueden ser negativas'
                    }
                }}
                errorMessage={errors.weighed_pounds?.message}
            />

            <TextFormField<WeeklyPlanTaskEndForm>
                label={wasteRequired ? 'Libras de desecho' : 'Libras de desecho (opcional)'}
                name="waste_pounds"
                type="number"
                placeholder={wasteRequired ? 'Ej. 12.5, o 0 si no hubo desecho' : 'Ej. 12.5'}
                register={register}
                validation={{
                    required: wasteRequired && 'Las libras de desecho son obligatorias',
                    valueAsNumber: true,
                    validate: {
                        positive: (value) => !(Number(value) < 0) || 'Las libras de desecho no pueden ser negativas'
                    }
                }}
                errorMessage={errors.waste_pounds?.message}
            />
        </>
    )
}
