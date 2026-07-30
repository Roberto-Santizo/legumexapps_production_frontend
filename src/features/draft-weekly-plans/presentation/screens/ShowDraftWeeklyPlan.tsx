import { BarChartCard, Loading, Title } from "@/features/shared/shared";
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

    const { data: hoursPerLine } = useQuery({
        queryKey: ['getHoursPerLineByDraftWeeklyPlanId', id],
        queryFn: () => draftWeeklyPlanProvider.getHoursPerLineByDraftWeeklyPlanId(id!)
    });


    if (isLoading) return <Loading />
    if (data && hoursPerLine) return (
        <div className="space-y-5">
            <Title title="Plan Semanal Borrador" subtitle="Información del plan semanal borrador" />

            <section className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1">
                    <BarChartCard title="Grafica de Horas Por Linea" data={hoursPerLine} excelColumns={[{ header: 'Línea', key: 'label' }, { header: 'Horas', key: 'value' }]} />
                </div>

                <DraftWeeklyPlanTasksSidebar />
            </section>
        </div>
    )
}
