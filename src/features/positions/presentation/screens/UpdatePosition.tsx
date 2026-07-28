import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { PositionFormComponent, positionProvider, type PositionForm } from "@/features/positions/positions";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdatePosition() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getPositionById', id],
        queryFn: () => positionProvider.getPositionById(id!)
    });

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValues
    } = useForm<PositionForm>();


    const { mutate, isPending } = useMutation({
        mutationFn: (payload: PositionForm) => positionProvider.updatePositionById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/posiciones');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { id, line, status, ...rest } = data;
            setValues(rest);
        }
    }, [data]);


    const onSubmit = (payload: PositionForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Puesto" subtitle="Actualiza la información del puesto" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <PositionFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
