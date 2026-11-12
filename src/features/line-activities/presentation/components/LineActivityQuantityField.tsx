import { TextFormField } from "@/features/shared/shared";
import { lineActivityQuantityRules } from "@/features/line-activities/line-activities";
import type { Path, UseFormRegister } from "react-hook-form";

type Props<T extends { quantity: number }> = {
    register: UseFormRegister<T>;
    errorMessage?: string;
}

export function LineActivityQuantityField<T extends { quantity: number }>({ register, errorMessage }: Props<T>) {
    return (
        <TextFormField<T>
            name={'quantity' as Path<T>}
            label="Personas necesarias"
            placeholder="Ej. 10"
            register={register}
            type="number"
            validation={lineActivityQuantityRules<T>()}
            errorMessage={errorMessage}
        />
    )
}
