import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { ClientFormComponent, clientProvider, type ClientForm } from "@/features/clients/clients";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateClient() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<ClientForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: ClientForm) => clientProvider.createClient(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/clientes');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: ClientForm) => mutate(payload);
    return (
        <div className="space-y-5">
            <Title title="Crear Cliente" subtitle="Registra un nuevo cliente" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <ClientFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Crear" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
