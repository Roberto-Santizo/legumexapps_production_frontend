import { Loading, Title } from "@/features/shared/shared";
import { draftWeeklyPlanProvider } from "@/features/draft-weekly-plans/draft-weekly-plans";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowDraftWeeklyPlan() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getDraftWeeklyPlanById', id],
        queryFn: () => draftWeeklyPlanProvider.getDraftWeeklyPlanById(id!)
    });


    if (isLoading) return <Loading />
    if (data) return (
        <Title title="Plan Semanal Borrador" subtitle="Información del plan semanal borrador" />
    )
}
