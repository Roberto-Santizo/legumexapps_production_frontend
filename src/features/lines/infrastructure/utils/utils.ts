import type { Option } from "@/features/shared/shared";
import type { Line } from "@/features/lines/lines";

export const linesOptions = (skus: Line[]): Option[] => {
    const options: Option[] = skus.map((line) => {
        return {
            value: `${line.id}`,
            label: line.name
        }
    })

    return options;
}