import { linesRepositoryProvider } from "@/features/lines/lines";
import { SelectFormField, TextFormField } from "@/features/shared/shared";
import { useQuery } from "@tanstack/react-query";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { PositionForm } from "@/features/positions/positions";

type Props = {
    register: UseFormRegister<PositionForm>;
    errors: FieldErrors<PositionForm>;
    control: Control<PositionForm, any>;
}

export function PositionFormComponent({ register, errors, control }: Props) {
    const { data } = useQuery({
        queryKey: ['getLines'],
        queryFn: () => linesRepositoryProvider.getLines('', '')
    });

    const lineOptions = data?.data.map(line => ({ value: line.id, label: line.name })) ?? [];

    return (
        <>
            <TextFormField<PositionForm>
                name="code"
                label="Código"
                placeholder="Código del puesto"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.code?.message}
            />

            <TextFormField<PositionForm>
                name="activity"
                label="Actividad"
                placeholder="Actividad del puesto"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.activity?.message}
            />

            <SelectFormField<PositionForm>
                name="line_id"
                label="Línea"
                control={control}
                validation={{ required: 'El campo es requerido' }}
                options={lineOptions}
                errorMessage={errors.line_id?.message}
            />
        </>
    )
}
