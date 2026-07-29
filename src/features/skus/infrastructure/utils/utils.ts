import type { Option } from "@/features/shared/shared";
import type { Sku } from "@/features/skus/skus";

export const skuOptions = (skus: Sku[]): Option[] => {
    const options: Option[] = skus.map((cdp) => {
        return {
            value: cdp.id,
            label: cdp.code
        }
    })

    return options;
}