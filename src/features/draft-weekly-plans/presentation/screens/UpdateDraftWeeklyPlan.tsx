import { CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { DraftWeeklyPlanFormComponent, draftWeeklyPlanProvider, type DraftWeeklyPlanForm } from "@/features/draft-weekly-plans/draft-weekly-plans";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateDraftWeeklyPlan() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ['getDraftWeeklyPlanById', id],
        queryFn: () => draftWeeklyPlanProvider.getDraftWeeklyPlanById(id!)
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValues
    } = useForm<DraftWeeklyPlanForm>();


    const { mutate, isPending } = useMutation({
        mutationFn: (payload: DraftWeeklyPlanForm) => draftWeeklyPlanProvider.updateDraftWeeklyPlanById(id!, payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/draft-planes-semanales');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    useEffect(() => {
        if (data) {
            const { id, confirmation_date, ...rest } = data;
            setValues(rest);
        }
    }, [data]);


    const onSubmit = (payload: DraftWeeklyPlanForm) => mutate(payload);
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Actualizar Plan Semanal Borrador" subtitle="Actualiza la información del plan semanal borrador" />

            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <DraftWeeklyPlanFormComponent register={register} errors={errors} />
                <CustomFilledButton type="submit" label="Guardar Cambios" disabled={isPending} />
            </CustomForm>
        </div>
    )
}
