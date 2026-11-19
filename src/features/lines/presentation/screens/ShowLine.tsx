import { ErrorComponent, Loading } from "@/features/shared/shared";
import { LineActivitiesConfigurator } from "@/features/line-activities/line-activities";
import { LineDependenciesByLine } from "@/features/line-dependencies/line-dependencies";
import { LineFieldsConfigurator } from "@/features/line-fields/line-fields";
import { LineHeader, LineSectionTabs, linesRepositoryProvider, type LineSectionTab } from "@/features/lines/lines";
import { PositionsByLine } from "@/features/positions/positions";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function ShowLine() {
    const { id } = useParams();
    const [tab, setTab] = useState<LineSectionTab>('fields');

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getLineByCode', id],
        queryFn: () => linesRepositoryProvider.getLineByCode(id!),
        retry: false
    });

    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) {

        return (
            <div className="space-y-6">
                <LineHeader line={data} />

                <LineSectionTabs value={tab} onChange={setTab} />

                <div role="tabpanel">
                    <div className={tab === 'fields' ? '' : 'hidden'}><LineFieldsConfigurator lineCode={data.code} captureType={data.capture_type} /></div>
                    <div className={tab === 'activities' ? '' : 'hidden'}><LineActivitiesConfigurator lineCode={data.code} /></div>
                    <div className={tab === 'positions' ? '' : 'hidden'}><PositionsByLine lineId={data.id} lineCode={data.code} /></div>
                    <div className={tab === 'dependencies' ? '' : 'hidden'}><LineDependenciesByLine id={data.id} /></div>
                </div>
            </div>
        )
    }
}
