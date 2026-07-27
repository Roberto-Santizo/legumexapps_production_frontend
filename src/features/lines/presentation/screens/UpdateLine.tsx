import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { type LineForm, LineFormComponent, linesRepositoryProvider } from "@/features/lines/lines";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateLine() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValues
    } = useForm<LineForm>();

    const { data, isLoading } = useQuery({
        queryKey: ['getLineByCode', id],
        queryFn: () => linesRepositoryProvider.getLineByCode(id!)
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: LineForm) => linesRepositoryProvider.updateLineByCode(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/lineas');
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

    const onSubmit = (payload: LineForm) => mutate(payload);

    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Línea" subtitle="Actualiza la información de la línea" />

            <section>
                <CustomForm onSubmit={handleSubmit(onSubmit)}>
                    <LineFormComponent register={register} control={control} errors={errors} />
                    <CustomFilledButton type="submit" disabled={isPending} label="Guardar Cambios" />
                </CustomForm>
            </section>
        </div>
    )
}
