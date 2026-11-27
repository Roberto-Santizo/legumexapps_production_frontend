import { ErrorComponent, Loading } from "@/features/shared/shared";
import { LineDependenciesByLine } from "@/features/line-dependencies/line-dependencies";
import { LineFieldsConfigurator } from "@/features/line-fields/line-fields";
import { getLineSectionTab, LINE_SECTION_TAB_PARAM, LineHeader, LineSectionTabs, linesRepositoryProvider, type LineSectionTab } from "@/features/lines/lines";
import { LinePerformances } from "@/features/performances/performances";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowLine() {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = getLineSectionTab(searchParams);

    const changeTab = (next: LineSectionTab) => setSearchParams(params => {
        params.set(LINE_SECTION_TAB_PARAM, next);
        return params;
    }, { replace: true });

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

                <LineSectionTabs value={tab} onChange={changeTab} />

                <div role="tabpanel">
                    <div className={tab === 'fields' ? '' : 'hidden'}><LineFieldsConfigurator lineCode={data.code} captureType={data.capture_type} /></div>
                    <div className={tab === 'configurations' ? '' : 'hidden'}><LinePerformances lineCode={data.code} /></div>
                    <div className={tab === 'dependencies' ? '' : 'hidden'}><LineDependenciesByLine id={data.id} /></div>
                </div>
            </div>
        )
    }
}
