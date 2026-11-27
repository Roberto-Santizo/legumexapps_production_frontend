import { ErrorComponent, Loading } from "@/features/shared/shared";
import { LineActivitiesConfigurator } from "@/features/line-activities/line-activities";
import { PerformanceHeader, PerformanceSectionTabs, usePerformanceById, usePerformanceSectionTab } from "@/features/performances/performances";
import { PositionsByLineSku } from "@/features/positions/positions";
import { useParams } from "react-router-dom";

export function ShowPerformance() {
    const { id } = useParams();
    const { tab, changeTab } = usePerformanceSectionTab();
    const { data, isLoading, isError, error } = usePerformanceById(id ?? '');

    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) return (
        <div className="space-y-6">
            <PerformanceHeader performance={data} />

            <PerformanceSectionTabs value={tab} onChange={changeTab} />

            <div role="tabpanel">
                <div className={tab === 'activities' ? '' : 'hidden'}><LineActivitiesConfigurator lineSkuId={data.id} /></div>
                <div className={tab === 'positions' ? '' : 'hidden'}><PositionsByLineSku lineSkuId={data.id} sku={data.sku} line={data.line} /></div>
            </div>
        </div>
    )
}
