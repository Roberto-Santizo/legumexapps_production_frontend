import { DateFormField, SelectFormField, TextFormField } from "@/features/shared/shared";
import { peformancesOptions, performanceProvider } from "@/features/performances/performances";
import { useQuery } from "@tanstack/react-query";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { WeeklyPlanTaskUpdateForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

type Props = {
    register: UseFormRegister<WeeklyPlanTaskUpdateForm>;
    errors: FieldErrors<WeeklyPlanTaskUpdateForm>;
    control: Control<WeeklyPlanTaskUpdateForm, any>;
}

export function WeeklyPlanTaskUpdateFormComponent({ register, errors, control }: Props) {
    const { data: performancesData } = useQuery({
        queryKey: ['getPerformances'],
        queryFn: () => performanceProvider.getPerformances('', '')
    });

    if (performancesData) return (
        <>
            <SelectFormField<WeeklyPlanTaskUpdateForm>
                name="line_sku_id"
                label="SKU"
                control={control}
                validation={{ required: 'El campo es requerido' }}
                options={peformancesOptions(performancesData.data)}
                errorMessage={errors.line_sku_id?.message}
            />

            <TextFormField<WeeklyPlanTaskUpdateForm>
                name="destination"
                label="Destino"
                placeholder="Destino"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.destination?.message}
            />

            <TextFormField<WeeklyPlanTaskUpdateForm>
                name="boxes"
                label="Cajas"
                placeholder="Cantidad de cajas"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.boxes?.message}
            />

            <TextFormField<WeeklyPlanTaskUpdateForm>
                name="produced_boxes"
                label="Cajas Producidas"
                placeholder="Cantidad de cajas producidas"
                register={register}
                type="number"
                validation={{ valueAsNumber: true }}
                errorMessage={errors.produced_boxes?.message}
            />

            <TextFormField<WeeklyPlanTaskUpdateForm>
                name="pallets"
                label="Pallets"
                placeholder="Cantidad de pallets"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.pallets?.message}
            />

            <TextFormField<WeeklyPlanTaskUpdateForm>
                name="produced_pallets"
                label="Pallets Producidos"
                placeholder="Cantidad de pallets producidos"
                register={register}
                type="number"
                validation={{ valueAsNumber: true }}
                errorMessage={errors.produced_pallets?.message}
            />

            <TextFormField<WeeklyPlanTaskUpdateForm>
                name="hours"
                label="Horas"
                placeholder="Cantidad de horas"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.hours?.message}
            />

            <TextFormField<WeeklyPlanTaskUpdateForm>
                name="weighed_pounds"
                label="Libras Pesadas"
                placeholder="Cantidad de libras pesadas"
                register={register}
                type="number"
                validation={{ }}
                errorMessage={errors.weighed_pounds?.message}
            />

            <DateFormField<WeeklyPlanTaskUpdateForm>
                name="operation_date"
                label="Fecha de Operación"
                register={register}
                validation={{}}
                errorMessage={errors.operation_date?.message}
            />

            <DateFormField<WeeklyPlanTaskUpdateForm>
                name="start_date"
                label="Fecha de Inicio"
                register={register}
                validation={{}}
                errorMessage={errors.start_date?.message}
            />

            <DateFormField<WeeklyPlanTaskUpdateForm>
                name="end_date"
                label="Fecha de Fin"
                register={register}
                validation={{}}
                errorMessage={errors.end_date?.message}
            />
        </>
    )
}
