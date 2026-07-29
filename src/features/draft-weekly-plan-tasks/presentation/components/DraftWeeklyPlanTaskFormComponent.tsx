import { DateFormField, SelectFormField, TextFormField } from "@/features/shared/shared";
import { linesOptions, linesRepositoryProvider } from "@/features/lines/lines";
import { skuOptions, skuProvider } from "@/features/skus/skus";
import { useQuery } from "@tanstack/react-query";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { DraftWeeklyPlanTaskForm } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";

type Props = {
    register: UseFormRegister<DraftWeeklyPlanTaskForm>;
    errors: FieldErrors<DraftWeeklyPlanTaskForm>;
    control: Control<DraftWeeklyPlanTaskForm, any>;
}

export function DraftWeeklyPlanTaskFormComponent({ register, errors, control }: Props) {
    const { data: skusData } = useQuery({
        queryKey: ['getSkus'],
        queryFn: () => skuProvider.getSkus('', '')
    });

    const { data: linesData } = useQuery({
        queryKey: ['getLines'],
        queryFn: () => linesRepositoryProvider.getLines('', '')
    });


    if (skusData && linesData) return (
        <>
            <SelectFormField<DraftWeeklyPlanTaskForm>
                name="sku_id"
                label="SKU"
                control={control}
                validation={{ required: 'El campo es requerido' }}
                options={skuOptions(skusData.data)}
                errorMessage={errors.sku_id?.message}
            />

            <SelectFormField<DraftWeeklyPlanTaskForm>
                name="line_id"
                label="Línea"
                control={control}
                validation={{}}
                options={linesOptions(linesData.data)}
                errorMessage={errors.line_id?.message}
            />

            <TextFormField<DraftWeeklyPlanTaskForm>
                name="boxes"
                label="Cajas"
                placeholder="Cantidad de cajas"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.boxes?.message}
            />

            <TextFormField<DraftWeeklyPlanTaskForm>
                name="destination"
                label="Destino"
                placeholder="Destino"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.destination?.message}
            />

            <DateFormField<DraftWeeklyPlanTaskForm>
                name="operation_date"
                label="Fecha de Operación"
                register={register}
                errorMessage={errors.operation_date?.message}
            />
        </>
    )
}
