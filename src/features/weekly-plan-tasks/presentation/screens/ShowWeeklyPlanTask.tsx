import { Loading, Title } from "@/features/shared/shared";
import { weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowWeeklyPlanTask() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getWeeklyPlanTaskById', id],
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(id!)
    });


    if (isLoading) return <Loading />
    if (data) return (
        <Title title="Tarea de Plan Semanal" subtitle="Información de la tarea del plan semanal" />
    )
}
