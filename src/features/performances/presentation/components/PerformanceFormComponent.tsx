import { linesOptions, linesRepositoryProvider } from "@/features/lines/lines";
import { paymentMethodOptions, type PerformanceForm } from "@/features/performances/performances";
import { SelectFormField, TextFormField } from "@/features/shared/shared";
import { skuOptions, skuProvider } from "@/features/skus/skus";
import { useQuery } from "@tanstack/react-query";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
    register: UseFormRegister<PerformanceForm>;
    errors: FieldErrors<PerformanceForm>;
    control: Control<PerformanceForm, any>;
}

export function PerformanceFormComponent({ register, errors, control }: Props) {
    const { data: skusData } = useQuery({
        queryKey: ['getSkus'],
        queryFn: () => skuProvider.getSkus('', '')
    });

    const { data: linesData } = useQuery({
        queryKey: ['getLines'],
        queryFn: () => linesRepositoryProvider.getLines('', '')
    });

    if(linesData && skusData) return (
        <>
            <SelectFormField<PerformanceForm>
                name="sku_id"
                label="SKU"
                control={control}
                validation={{ required: 'El campo es requerido' }}
                options={skuOptions(skusData.data)}
                errorMessage={errors.sku_id?.message}
            />

            <SelectFormField<PerformanceForm>
                name="line_id"
                label="Línea"
                control={control}
                validation={{ required: 'El campo es requerido' }}
                options={linesOptions(linesData.data)}
                errorMessage={errors.line_id?.message}
            />

            <TextFormField<PerformanceForm>
                name="lbs_performance"
                label="Libras de Rendimiento"
                placeholder="Libras de rendimiento"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.lbs_performance?.message}
            />

            <TextFormField<PerformanceForm>
                name="accepted_percentage"
                label="Porcentaje Aceptado"
                placeholder="Porcentaje aceptado"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.accepted_percentage?.message}
            />

            <SelectFormField<PerformanceForm>
                name="payment_method"
                label="Método de Pago"
                control={control}
                validation={{ required: 'El campo es requerido' }}
                options={paymentMethodOptions}
                errorMessage={errors.payment_method?.message}
            />
        </>
    )
}
