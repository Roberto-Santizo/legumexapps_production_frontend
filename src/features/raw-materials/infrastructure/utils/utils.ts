import type { Option } from "@/features/shared/shared";
import type { RawMaterialItem } from "@/features/raw-materials/raw-materials";

export const rawMaterialOptions = (items: RawMaterialItem[]): Option[] => {
    const options: Option[] = items.map((item) => {
        return {
            value: item.id,
            label: `${item.code} - ${item.product_name}`
        }
    })

    return options;
}
