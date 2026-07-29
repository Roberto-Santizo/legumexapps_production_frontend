import type { Option } from "@/features/shared/shared";
import type { PackingMaterialItem } from "@/features/packing-materials/packing-materials";

export const packingMaterialOptions = (items: PackingMaterialItem[]): Option[] => {
    const options: Option[] = items.map((item) => {
        return {
            value: item.id,
            label: `${item.code} - ${item.name}`
        }
    })

    return options;
}