import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { ClientFormComponent, clientProvider, type ClientForm } from "@/features/clients/clients";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateClient() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getClientById', id],
        queryFn: () => clientProvider.getClientById(id!)
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValues
    } = useForm<ClientForm>();


    const { mutate, isPending } = useMutation({
        mutationFn: (payload: ClientForm) => clientProvider.updateClientById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/clientes');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { id, ...rest } = data;
            setValues(rest);
        }
    }, [data]);


    const onSubmit = (payload: ClientForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Cliente" subtitle="Actualiza la información del cliente" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <ClientFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
