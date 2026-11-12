import { SelectFormField, type Option } from "@/features/shared/shared";
import { LineActivityQuantityField, type AssignLineActivityForm } from "@/features/line-activities/line-activities";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
    register: UseFormRegister<AssignLineActivityForm>;
    control: Control<AssignLineActivityForm>;
    errors: FieldErrors<AssignLineActivityForm>;
    options: Option[];
}

export function AssignLineActivityFormComponent({ register, control, errors, options }: Props) {
    return (
        <>
            <SelectFormField<AssignLineActivityForm>
                name="activity_id"
                label="Actividad"
                options={options}
                control={control}
                validation={{ required: 'La actividad es obligatoria.' }}
                errorMessage={errors.activity_id?.message}
            />

            <LineActivityQuantityField<AssignLineActivityForm>
                register={register}
                errorMessage={errors.quantity?.message}
            />
        </>
    )
}
