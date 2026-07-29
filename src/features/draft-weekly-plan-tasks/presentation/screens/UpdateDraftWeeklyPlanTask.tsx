import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { DraftWeeklyPlanTaskFormComponent, draftWeeklyPlanTaskProvider, type DraftWeeklyPlanTaskForm } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateDraftWeeklyPlanTask() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getDraftWeeklyPlanTaskById', id],
        queryFn: () => draftWeeklyPlanTaskProvider.getDraftWeeklyPlanTaskById(id!)
    });

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValues
    } = useForm<DraftWeeklyPlanTaskForm>();


    const { mutate, isPending } = useMutation({
        mutationFn: (payload: DraftWeeklyPlanTaskForm) => draftWeeklyPlanTaskProvider.updateDraftWeeklyPlanTaskById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/draft-tareas-planes-semanales');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { boxes, destination, operation_date, sku_id, line_id } = data;
            setValues({ boxes, destination, operation_date, sku_id, line_id });
        }
    }, [data]);


    const onSubmit = (payload: DraftWeeklyPlanTaskForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Tarea de Plan Semanal Draft" subtitle="Actualiza la información de la tarea del plan semanal draft" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <DraftWeeklyPlanTaskFormComponent register={register} errors={errors} control={control} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
