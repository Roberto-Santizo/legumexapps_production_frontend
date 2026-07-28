import { clientProvider } from "@/features/clients/clients";
import { SelectFormField, TextFormField } from "@/features/shared/shared";
import { useQuery } from "@tanstack/react-query";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { SkuForm } from "@/features/skus/skus";

type Props = {
    register: UseFormRegister<SkuForm>;
    errors: FieldErrors<SkuForm>;
    control: Control<SkuForm, any>;
}

export function SkuFormComponent({ register, errors, control }: Props) {
    const { data } = useQuery({
        queryKey: ['getClients'],
        queryFn: () => clientProvider.getClients('', '')
    });

    const clientOptions = data?.data.map(client => ({ value: client.id, label: client.name })) ?? [];

    return (
        <>
            <TextFormField<SkuForm>
                name="code"
                label="Código"
                placeholder="Código del SKU"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.code?.message}
            />

            <TextFormField<SkuForm>
                name="product_name"
                label="Nombre del Producto"
                placeholder="Nombre del producto"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.product_name?.message}
            />

            <TextFormField<SkuForm>
                name="presentation"
                label="Presentación"
                placeholder="Presentación"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.presentation?.message}
            />

            <TextFormField<SkuForm>
                name="boxes_per_pallet"
                label="Cajas por Tarima"
                placeholder="Cajas por tarima"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.boxes_per_pallet?.message}
            />

            <SelectFormField<SkuForm>
                name="client_id"
                label="Cliente"
                control={control}
                validation={{ required: 'El campo es requerido' }}
                options={clientOptions}
                errorMessage={errors.client_id?.message}
            />
        </>
    )
}
