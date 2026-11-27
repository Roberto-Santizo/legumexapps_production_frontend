import { lineConfigurationsPath } from "@/features/lines/lines";

export const PERFORMANCE_LINE_PARAM = 'lineCode';

export const PERFORMANCES_PATH = '/rendimientos';

export const performanceReturnPath = (lineCode: string | null): string =>
    lineCode ? lineConfigurationsPath(lineCode) : PERFORMANCES_PATH;

const withLine = (path: string, lineCode?: string | null): string =>
    lineCode ? `${path}?${new URLSearchParams({ [PERFORMANCE_LINE_PARAM]: lineCode }).toString()}` : path;

export const createPerformancePath = (lineCode?: string | null): string => withLine(`${PERFORMANCES_PATH}/crear`, lineCode);

export const editPerformancePath = (id: number, lineCode?: string | null): string => withLine(`${PERFORMANCES_PATH}/${id}/editar`, lineCode);

export const showPerformancePath = (id: number): string => `${PERFORMANCES_PATH}/${id}`;
