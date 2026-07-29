import { CustomFilledButton, CustomForm, Drawer, SelectFormField, TextFormField } from "@/features/shared/shared";
import { linesOptions, linesRepositoryProvider } from "@/features/lines/lines";
import { paymentMethodOptions, usePerformancesFilters, type PerformanceFilters } from "@/features/performances/performances";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

type Props = {
    showFilters: boolean;
    close: () => void;
}
export function PerformanceFiltersComponent({ showFilters, close }: Props) {
    const { filters, setFilters, clearFilters } = usePerformancesFilters();

    const { handleSubmit, register, control, reset } = useForm<PerformanceFilters>({ defaultValues: filters });

    useEffect(() => {
        reset(filters);
    }, [filters, reset]);

    const { data } = useQuery({
        queryKey: ['getLines'],
        queryFn: () => linesRepositoryProvider.getLines('', '')
    });

    const onClearFilters = () => {
        clearFilters();
        close();
    }
    const onSubmit = (payload: PerformanceFilters) => {
        close();
        setFilters(payload);
    }

    if (data) return (
        <Drawer drawer={showFilters && !!data} closeDrawer={() => close()} title="Filtros">
            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <TextFormField<PerformanceFilters>
                    name="sku"
                    label="SKU"
                    placeholder="Código del SKU"
                    register={register}
                    validation={{}}
                    type="text"
                />

                <SelectFormField<PerformanceFilters>
                    name="payment_method"
                    label="Método de Pago"
                    validation={{}}
                    control={control}
                    options={paymentMethodOptions}
                />

                <SelectFormField<PerformanceFilters>
                    name="line_id"
                    label="Línea"
                    validation={{}}
                    control={control}
                    options={linesOptions(data.data)}
                />

                <div className="grid grid-cols-2 gap-5">
                    <CustomFilledButton label="Filtrar" type="submit" />
                    <CustomFilledButton label="Borrar Filtros" type="button" onClick={() => onClearFilters()} />
                </div>
            </CustomForm>
        </Drawer>
    )
}
