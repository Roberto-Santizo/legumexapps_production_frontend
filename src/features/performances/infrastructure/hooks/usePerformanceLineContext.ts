import { useLineByCode } from "@/features/lines/lines";
import { PERFORMANCE_LINE_PARAM, performanceReturnPath } from "@/features/performances/performances";
import { useSearchParams } from "react-router-dom";

export function usePerformanceLineContext() {
    const [searchParams] = useSearchParams();
    const lineCode = searchParams.get(PERFORMANCE_LINE_PARAM);
    const { data: line, isLoading } = useLineByCode(lineCode ?? '', Boolean(lineCode));

    return {
        lineCode,
        line,
        isLoadingLine: isLoading,
        returnPath: performanceReturnPath(lineCode)
    };
}
