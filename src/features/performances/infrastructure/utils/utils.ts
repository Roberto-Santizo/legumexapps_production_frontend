import type { Option } from "@/features/shared/shared";
import type { Performance } from "@/features/performances/performances";

export const peformancesOptions = (performances: Performance[]): Option[] => {
    const options: Option[] = performances.map((performance) => {
        return {
            value: performance.id,
            label: `${performance.sku} - ${performance.line}`
        }
    })

    return options;
}