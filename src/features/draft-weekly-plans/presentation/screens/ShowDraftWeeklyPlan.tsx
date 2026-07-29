import { Loading, Title } from "@/features/shared/shared";
import { draftWeeklyPlanProvider } from "@/features/draft-weekly-plans/draft-weekly-plans";
import { DraftWeeklyPlanTasksSidebar } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";
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
        <div>
            <Title title="Plan Semanal Borrador" subtitle="Información del plan semanal borrador" />

            <section className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1">
                    <h2>Sección de tareas</h2>
                </div>

                <DraftWeeklyPlanTasksSidebar />
            </section>
        </div>
    )
}
