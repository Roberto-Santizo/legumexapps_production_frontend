import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { LoginForm } from "@/features/auth/auth";
import { PasswordFormField, TextFormField } from "@/features/shared/shared";

type Props = {
    register: UseFormRegister<LoginForm>;
    errors: FieldErrors<LoginForm>;
};

export function LoginFormComponent({ register, errors }: Props) {
    return (
        <div className="flex flex-col gap-4">
            <TextFormField<LoginForm>
                name="username"
                label="Usuario"
                placeholder="Tu nombre de usuario"
                type="text"
                errorMessage={errors.username?.message}
                register={register}
                validation={{ required: 'El nombre de usuario es requerido' }}
            />

            <PasswordFormField<LoginForm>
                name="password"
                label="Contraseña"
                placeholder="Tu contraseña"
                errorMessage={errors.password?.message}
                register={register}
                validation={{ required: 'La contraseña es requerida' }}
            />
        </div>
    );
}
