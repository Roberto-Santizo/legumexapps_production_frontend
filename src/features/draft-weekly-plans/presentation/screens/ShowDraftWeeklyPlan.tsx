import { BarChartCard, CustomFilledButton, FadeInDown, FadeInLeft, FadeInUp, Loading, Title, useNotification } from "@/features/shared/shared";
import { draftWeeklyPlanProvider } from "@/features/draft-weekly-plans/draft-weekly-plans";
import { DraftWeeklyPlanTasksSidebar } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

export function ShowDraftWeeklyPlan() {
    const { id } = useParams();
    const notification = useNotification();

    const { data, isLoading, refetch } = useQuery({
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

    const { mutate, isPending } = useMutation({
        mutationFn: () => draftWeeklyPlanProvider.confirmDraftWeeklyPlan(id!),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleConfirmPlan = () => {
        notification.question('¿Desea confirmar el plan?', 'Confirmar', 'Al confirmar el plan no se puede deshacer la acción', () => mutate());
    }

    if (isLoading) return <Loading />
    if (data && hoursPerLine && packingMaterialNecessity && rawMaterialNecessity) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Plan Semanal Borrador" subtitle="Información del plan semanal borrador" />

                {!data.confirmation_date && (
                    <CustomFilledButton
                        label="Confirmar Plan"
                        type="button"
                        disabled={isPending}
                        onClick={() => handleConfirmPlan()}
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
