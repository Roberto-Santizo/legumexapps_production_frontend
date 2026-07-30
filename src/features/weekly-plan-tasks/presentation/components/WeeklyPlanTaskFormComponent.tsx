import { DateFormField, SelectFormField, TextFormField } from "@/features/shared/shared";
import { peformancesOptions, performanceProvider } from "@/features/performances/performances";
import { useQuery } from "@tanstack/react-query";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { WeeklyPlanTaskCreateForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

type Props = {
    register: UseFormRegister<WeeklyPlanTaskCreateForm>;
    errors: FieldErrors<WeeklyPlanTaskCreateForm>;
    control: Control<WeeklyPlanTaskCreateForm, any>;
}

export function WeeklyPlanTaskFormComponent({ register, errors, control }: Props) {
    const { data: performancesData } = useQuery({
        queryKey: ['getPerformances'],
        queryFn: () => performanceProvider.getPerformances('', '')
    });

    if (performancesData) return (
        <>
            <SelectFormField<WeeklyPlanTaskCreateForm>
                name="line_sku_id"
                label="SKU"
                control={control}
                validation={{ required: 'El campo es requerido' }}
                options={peformancesOptions(performancesData.data)}
                errorMessage={errors.line_sku_id?.message}
            />

            <TextFormField<WeeklyPlanTaskCreateForm>
                name="boxes"
                label="Cajas"
                placeholder="Cantidad de cajas"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.boxes?.message}
            />

            <TextFormField<WeeklyPlanTaskCreateForm>
                name="destination"
                label="Destino"
                placeholder="Destino"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.destination?.message}
            />

            <DateFormField<WeeklyPlanTaskCreateForm>
                name="operation_date"
                label="Fecha de Operación"
                register={register}
                validation={{}}
                errorMessage={errors.operation_date?.message}
            />
        </>
    )
}
