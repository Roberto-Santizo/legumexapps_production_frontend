import { BarChartCard, CustomFilledButton, FadeInDown, FadeInLeft, FadeInUp, Loading, Title } from "@/features/shared/shared";
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

    const { data: packingMaterialNecessity } = useQuery({
        queryKey: ['getPackingMaterialNecessityById', id],
        queryFn: () => draftWeeklyPlanProvider.getPackingMaterialNecessityById(id!)
    });

    const { data: rawMaterialNecessity } = useQuery({
        queryKey: ['getRawNecessityById', id],
        queryFn: () => draftWeeklyPlanProvider.getRawNecessityById(id!)
    });

    if (isLoading) return <Loading />
    if (data && hoursPerLine && packingMaterialNecessity && rawMaterialNecessity) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Plan Semanal Borrador" subtitle="Información del plan semanal borrador" />

                {!data.confirmation_date && (
                    <CustomFilledButton
                        label="Confirmar Plan"
                        type="button"
                    />
                )}
            </div>

            <section className="flex flex-col gap-6 lg:flex-row">
                <div className="flex-1 flex flex-col gap-10">
                    <FadeInDown>
                        <BarChartCard title="Grafica de Horas Por Linea" data={hoursPerLine} excelColumns={[{ header: 'Línea', key: 'label' }, { header: 'Horas', key: 'value' }]} />
                    </FadeInDown>

                    <FadeInUp>
                        <BarChartCard title="Grafica Necesidad de Material Empaque" data={packingMaterialNecessity} excelColumns={[{ header: 'Item', key: 'label' }, { header: 'Cantidad', key: 'value' }]} />
                    </FadeInUp>

                    <FadeInLeft>
                        <BarChartCard title="Grafica Necesidad de Materia Prima" data={rawMaterialNecessity} excelColumns={[{ header: 'Item', key: 'label' }, { header: 'Cantidad', key: 'value' }]} />
                    </FadeInLeft>
                </div>
                <DraftWeeklyPlanTasksSidebar />
            </section>
        </div>
    )
}
