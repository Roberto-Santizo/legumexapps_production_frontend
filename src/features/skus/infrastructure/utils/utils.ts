import type { Option } from "@/features/shared/shared";
import { defaultSkuFilters, skuProvider, type Sku } from "@/features/skus/skus";

const SKU_SEARCH_LIMIT = '20';

export const skuOptions = (skus: Sku[]): Option[] => {
    const options: Option[] = skus.map((sku) => {
        return {
            value: sku.id,
            label: `${sku.code} - ${sku.product_name}`
        }
    })

    return options;
}

export const searchSkuOptions = async (code: string): Promise<Option[]> => {
    const { data } = await skuProvider.getSkus(SKU_SEARCH_LIMIT, '1', { ...defaultSkuFilters, code });

    return skuOptions(data);
}
