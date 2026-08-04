import { Loading, Title } from "@/features/shared/shared";
import { weeklyPlanTaskObservationProvider } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowWeeklyPlanTaskObservation() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getWeeklyPlanTaskObservationById', id],
        queryFn: () => weeklyPlanTaskObservationProvider.getWeeklyPlanTaskObservationById(id!)
    });

    if (isLoading) return <Loading />
    if (data) return (
        <Title title="Observación" subtitle="Información de la observación" />
    )
}
