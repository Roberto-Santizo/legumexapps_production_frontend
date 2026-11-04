import { useQuery } from "@tanstack/react-query";
import { linesRepositoryProvider } from "@/features/lines/lines";

export const lineByCodeQueryKey = (code: string) => ['getLineByCode', code];

export function useLineByCode(code: string, enabled = true) {
    return useQuery({
        queryKey: lineByCodeQueryKey(code),
        queryFn: () => linesRepositoryProvider.getLineByCode(code),
        enabled: enabled && !!code,
        retry: false
    });
}
