import { getPerformanceSectionTab, PERFORMANCE_SECTION_TAB_PARAM, type PerformanceSectionTab } from "@/features/performances/performances";
import { useSearchParams } from "react-router-dom";

export function usePerformanceSectionTab() {
    const [searchParams, setSearchParams] = useSearchParams();

    const changeTab = (next: PerformanceSectionTab) => setSearchParams(params => {
        params.set(PERFORMANCE_SECTION_TAB_PARAM, next);
        return params;
    }, { replace: true });

    return { tab: getPerformanceSectionTab(searchParams), changeTab };
}
