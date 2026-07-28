import { TextFormField } from "@/features/shared/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TimeoutForm } from "@/features/timeouts/timeouts";

type Props = {
    register: UseFormRegister<TimeoutForm>;
    errors: FieldErrors<TimeoutForm>;
}

export function TimeoutFormComponent({ register, errors }: Props) {
    return (
        <>
            <TextFormField<TimeoutForm>
                name="name"
                label="Nombre"
                placeholder="Nombre del tiempo muerto"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.name?.message}
            />
        </>
    )
}
