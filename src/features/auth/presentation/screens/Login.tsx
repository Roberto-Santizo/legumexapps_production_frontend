import { authRepositoryProvider, login, type LoginForm } from "@/features/auth/auth";
import { CustomFilledButton, PasswordFormField, TextFormField } from "@/features/shared/shared";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import type { AppDispatch } from "@/config/config";

export function Login() {
    const { error } = useNotification();
    const dispatch = useDispatch<AppDispatch>();

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue
    } = useForm<LoginForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: LoginForm) => authRepositoryProvider.login(payload),
        onSuccess: (user) => {
            dispatch(login(user))
        },
        onError: (err) => {
            error(err.message);
            setValue('password', '');
        }
    });

    const onSubmit = (data: LoginForm) => mutate(data);
    return (
        <div className="grid place-items-center h-screen">
            <div className="flex flex-col w-1/4">
                <form className="flex flex-col justify-center space-y-6 shadow-xl p-6 bg-white" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-2xl font-bold text-center mb-5">Iniciar Sesión</h1>

                    <TextFormField<LoginForm>
                        name="username"
                        label="Nombre de Usuario"
                        placeholder="Ingrese el nombre de usuario"
                        type="text"
                        errorMessage={errors.username?.message}
                        register={register}
                        validation={{ required: 'El nombre de usuario es requerido' }}
                    />

                    <PasswordFormField<LoginForm>
                        name="password"
                        label="Contraseña"
                        placeholder="Contraseña"
                        errorMessage={errors.password?.message}
                        register={register}
                        validation={{ required: 'La contraseña es requerida' }}
                    />

                    <CustomFilledButton label={isPending ? 'Iniciando sesión' : 'Iniciar Sesión'} type="submit" disabled={isPending}/>
                </form>
            </div>
        </div>
    )
}
