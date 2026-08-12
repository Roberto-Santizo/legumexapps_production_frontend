import { defaultWeeklyPlanTaskFilters, ModalPackingMaterialItemsByTask, weeklyPlanTaskProvider, WeeklyPlanTaskRowComponent } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { ErrorComponent, Loading } from "@/features/shared/shared";
import { ModalCreateWeeklyPlanTaskObservation } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";


export function WeeklyPlanTasksDetailsByLineDate() {
    const { lineCode, date } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['getWeeklyPlanTasksByLineDate', lineCode, date],
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTasks('', '', { ...defaultWeeklyPlanTaskFilters, operationDate: date!, lineCode: lineCode! }),
        retry: false
    });

    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) return (
        <div className="space-y-6">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 rounded-lg py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 motion-reduce:transition-none"
            >
                <ArrowLeftIcon size={14} />
                Volver al plan
            </button>
            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-ink">Tareas del día</h2>

                {data.data.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-line-strong bg-surface p-10 text-center">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle">
                            Sin tareas
                        </p>

                        <p className="mt-3 text-sm text-ink-muted">
                            Esta línea no tiene tareas programadas para el día. Asigna tareas desde el calendario del plan semanal.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
                        {data.data.map(task => (
                            <WeeklyPlanTaskRowComponent key={task.id} task={task} refetch={refetch} />
                        ))}
                    </div>
                )}
            </section>

            <ModalPackingMaterialItemsByTask />

            <ModalCreateWeeklyPlanTaskObservation />
        </div>
    )
}
