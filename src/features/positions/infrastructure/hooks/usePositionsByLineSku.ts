import { positionProvider, positionsByLineSkuQueryKey } from "@/features/positions/positions";
import { useQuery } from "@tanstack/react-query";

export function usePositionsByLineSku(lineSkuId: number) {
    return useQuery({
        queryKey: positionsByLineSkuQueryKey(lineSkuId),
        queryFn: () => positionProvider.getPositions('', '', lineSkuId),
        retry: false
    });
}
