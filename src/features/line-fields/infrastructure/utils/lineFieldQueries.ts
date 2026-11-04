import type { QueryClient } from "@tanstack/react-query";

export const lineFieldsQueryKey = (lineCode: string) => ['getLineFields', lineCode];

export function invalidateLineFieldQueries(queryClient: QueryClient, lineCode: string) {
    queryClient.invalidateQueries({ queryKey: lineFieldsQueryKey(lineCode) });
    queryClient.invalidateQueries({ queryKey: ['getCaptureFields'] });
}
