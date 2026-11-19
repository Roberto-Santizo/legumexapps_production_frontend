import { positionProvider, positionsByLineQueryKey } from "@/features/positions/positions";
import { useQuery } from "@tanstack/react-query";

export function usePositionsByLine(lineCode: string) {
    return useQuery({
        queryKey: positionsByLineQueryKey(lineCode),
        queryFn: () => positionProvider.getPositions('', '', lineCode),
        retry: false
    });
}
