import { positionByIdQueryKey, positionProvider } from "@/features/positions/positions";
import { useQuery } from "@tanstack/react-query";

export function usePositionById(id: string) {
    return useQuery({
        queryKey: positionByIdQueryKey(id),
        queryFn: () => positionProvider.getPositionById(id),
        enabled: id !== '',
        retry: false
    });
}
