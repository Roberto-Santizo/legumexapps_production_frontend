import { Loading, Title } from "@/features/shared/shared";
import { weeklyPlanProvider } from "@/features/weekly-plans/weekly-plans";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowWeeklyPlan() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getWeeklyPlanById', id],
        queryFn: () => weeklyPlanProvider.getWeeklyPlanById(id!)
    });


    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Plan Semanal" subtitle="Información del plan semanal" />

            <section>
                <p className="">{data.week}</p>
                <p className="">{data.year}</p>
            </section>
        </div>
    )
}
