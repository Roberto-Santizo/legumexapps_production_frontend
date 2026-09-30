import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { WeeklyPlanTaskFormComponent, weeklyPlanTaskProvider, type WeeklyPlanTaskCreateForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BellRing } from "lucide-react";

export function CreateWeeklyPlanTask() {
    const notification = useNotification();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm<WeeklyPlanTaskCreateForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanTaskCreateForm) => weeklyPlanTaskProvider.createWeeklyPlanTask(payload),
        onSuccess: (message) => {
            notification.success(message);
            navigate('/planes-semanales-tareas');
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: WeeklyPlanTaskCreateForm) => mutate(payload);
    return (
        <div className="mx-auto w-full max-w-5xl space-y-6">
            <div className="space-y-3">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-md text-xs font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
                >
                    <ArrowLeft className="size-3.5" />
                    Volver
                </button>
                <Title title="Crear tarea de plan semanal" subtitle="Define qué se produce, cuántas cajas y hacia dónde van" />
            </div>

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_17rem]">
                <CustomForm onSubmit={handleSubmit(onSubmit)}>
                    <WeeklyPlanTaskFormComponent register={register} errors={errors} control={control} />

                    <footer className="-mx-8 -mb-8 flex flex-col-reverse gap-3 border-t border-line bg-canvas/60 px-8 py-4 sm:flex-row sm:items-center sm:justify-end">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="cursor-pointer rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
                        >
                            Cancelar
                        </button>
                        <CustomFilledButton type="submit" label="Crear tarea" disabled={isPending} className="sm:min-w-32" />
                    </footer>
                </CustomForm>

                <aside className="rounded-2xl border border-line bg-surface p-5">
                    <div className="flex items-center gap-2">
                        <BellRing className="size-4 text-ink" />
                        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">Fuera de planificación</h2>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                        Crear una tarea fuera de la planificación enviará una notificación general al equipo.
                    </p>
                    <dl className="mt-4 space-y-2 border-t border-line pt-4 text-xs">
                        <div className="flex justify-between gap-3">
                            <dt className="text-ink-subtle">Requeridos</dt>
                            <dd className="text-ink">SKU, cajas, destino</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                            <dt className="text-ink-subtle">Opcional</dt>
                            <dd className="text-ink">Fecha de operación</dd>
                        </div>
                    </dl>
                </aside>
            </div>
        </div>
    )
}
