import type { Option } from "@/features/shared/shared";
import { defaultPackingMaterialFilters, packingMaterialProvider, type PackingMaterialItem } from "@/features/packing-materials/packing-materials";

const PACKING_MATERIAL_SEARCH_LIMIT = '20';

export const packingMaterialOptions = (items: PackingMaterialItem[]): Option[] => {
    const options: Option[] = items.map((item) => {
        return {
            value: item.id,
            label: `${item.code} - ${item.name}`
        }
    })

    return options;
}

export const searchPackingMaterialOptions = async (code: string): Promise<Option[]> => {
    const { data } = await packingMaterialProvider.getPackingMaterialItems(PACKING_MATERIAL_SEARCH_LIMIT, '1', { ...defaultPackingMaterialFilters, code });

    return packingMaterialOptions(data);
}
