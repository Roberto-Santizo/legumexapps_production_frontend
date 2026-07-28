import { TextFormField } from "@/features/shared/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ClientForm } from "@/features/clients/clients";

type Props = {
    register: UseFormRegister<ClientForm>;
    errors: FieldErrors<ClientForm>;
}

export function ClientFormComponent({ register, errors }: Props) {
    return (
        <>
            <TextFormField<ClientForm>
                name="name"
                label="Nombre"
                placeholder="Nombre del cliente"
                register={register}
                type="text"
                validation={{ required: 'El campo es requerido' }}
                errorMessage={errors.name?.message}
            />
        </>
    )
}
