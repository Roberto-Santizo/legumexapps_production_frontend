import { SelectFormField, TextFormField } from "@/features/shared/shared";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { toLineActivityOptions, usePositionLineActivities, type PositionForm } from "@/features/positions/positions";

type Props = {
    register: UseFormRegister<PositionForm>;
    errors: FieldErrors<PositionForm>;
    control: Control<PositionForm>;
    lineCode: string;
}

export function PositionFormComponent({ register, errors, control, lineCode }: Props) {
    const { data: lineActivities, isFetching } = usePositionLineActivities(lineCode);

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

            <SelectFormField<PositionForm>
                name="activity_id"
                label="Actividad"
                control={control}
                validation={{ required: 'El campo es requerido' }}
                options={toLineActivityOptions(lineActivities ?? [])}
                disabled={isFetching}
                errorMessage={errors.activity_id?.message}
            />

            {lineActivities?.length === 0 && (
                <p className="text-xs text-ink-muted">La línea no tiene actividades asignadas. Asígnalas en Dotación de personal.</p>
            )}
        </>
    )
}
