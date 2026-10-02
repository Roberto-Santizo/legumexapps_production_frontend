import { TextFormField } from "@/features/shared/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { toNullableNumber, type WeeklyPlanTaskPerformanceRecordForm } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";

type Props = {
    register: UseFormRegister<WeeklyPlanTaskPerformanceRecordForm>;
    errors: FieldErrors<WeeklyPlanTaskPerformanceRecordForm>;
}

export function WeeklyPlanTaskPerformanceRecordFormComponent({ register, errors }: Props) {
    return (
        <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <TextFormField<WeeklyPlanTaskPerformanceRecordForm>
                    label="Número de pallet"
                    name="pallet_number"
                    type="number"
                    placeholder="Opcional"
                    register={register}
                    validation={{
                        setValueAs: toNullableNumber,
                        validate: {
                            integer: (value) => value === null || Number.isInteger(value) || 'El número de pallet debe ser un número entero',
                            positive: (value) => value === null || value >= 1 || 'El número de pallet debe ser mayor a 0'
                        }
                    }}
                    errorMessage={errors.pallet_number?.message}
                />

                <TextFormField<WeeklyPlanTaskPerformanceRecordForm>
                    label="Cajas"
                    name="boxes"
                    type="number"
                    placeholder="Opcional"
                    register={register}
                    validation={{
                        setValueAs: toNullableNumber,
                        validate: {
                            integer: (value) => value === null || Number.isInteger(value) || 'Las cajas deben ser un número entero',
                            positive: (value) => value === null || value >= 0 || 'Las cajas no pueden ser negativas'
                        }
                    }}
                    errorMessage={errors.boxes?.message}
                />
            </div>

            <TextFormField<WeeklyPlanTaskPerformanceRecordForm>
                label="Libras pesadas"
                name="weighed_pounds"
                type="number"
                placeholder="Ej. 1700.5"
                register={register}
                validation={{
                    required: 'Las libras pesadas son obligatorias',
                    valueAsNumber: true,
                    validate: {
                        numeric: (value) => Number.isFinite(value) || 'Las libras pesadas deben ser un valor numérico',
                        positive: (value) => (value !== null && value >= 0) || 'Las libras pesadas no pueden ser negativas'
                    }
                }}
                errorMessage={errors.weighed_pounds?.message}
            />
        </>
    )
}
