import { ErrorComponent, Loading, Title } from "@/features/shared/shared";
import { WeeklyPlanEmployeeDetail, weeklyPlanEmployeeProvider } from "@/features/weekly-plan-employees/weekly-plan-employees";
import { useQuery } from "@tanstack/react-query";
import { EditIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export function ShowWeeklyPlanEmployee() {
    const { id } = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getWeeklyPlanEmployeeById', id],
        queryFn: () => weeklyPlanEmployeeProvider.getWeeklyPlanEmployeeById(id!),
        retry: false
    });

    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Title title="Empleado del Plan Semanal" subtitle="Posición asignada al empleado en el plan" />

                <Link
                    to={`/empleados-planes-semanales/${data.id}/editar`}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                    <EditIcon className="size-4 text-ink-muted" />
                    Editar
                </Link>
            </div>

            <WeeklyPlanEmployeeDetail employee={data} />
        </div>
    )
}
