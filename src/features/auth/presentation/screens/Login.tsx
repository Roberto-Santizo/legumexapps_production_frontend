import { authRepositoryProvider, login, LoginBrandPanel, LoginFormComponent, type LoginForm } from "@/features/auth/auth";
import { CustomFilledButton, useNotification } from "@/features/shared/shared";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
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
        <div className="grid min-h-screen bg-canvas lg:grid-cols-[5fr_7fr]">
            <LoginBrandPanel today={new Date()} />

            <section className="flex items-center justify-center px-4 py-12 sm:px-10">
                <div className="flex w-full max-w-sm flex-col gap-8">
                    <header className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">Acceso de personal</p>
                        <h1 className="text-3xl font-semibold tracking-tight text-ink">Iniciar sesión</h1>
                        <p className="text-sm text-ink-muted">Ingresa con el usuario y la contraseña que te asignó administración.</p>
                    </header>

                    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <LoginFormComponent register={register} errors={errors} />
                        <CustomFilledButton label="Iniciar sesión" type="submit" disabled={isPending} fullWitdh className="py-2.5" />
                    </form>

                    <p className="border-t border-line pt-6 text-xs leading-relaxed text-ink-subtle">
                        ¿No puedes ingresar? Solicita el restablecimiento de tu contraseña al administrador del sistema.
                    </p>
                </div>
            </section>
        </div>
    )
}
