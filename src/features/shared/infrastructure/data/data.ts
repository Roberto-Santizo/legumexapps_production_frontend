import type { Option } from "@/features/shared/shared";

export const extraordinaryOptions = (): Option[] => {
    const options: Option[] = [
        {
            value: 0,
            label: "Planificada"
        },
        {
            value: 1,
            label: "Extraordinaria"
        }
    ]

    return options;
}

export const trueOrFalseOptions = (): Option[] => {
    const options: Option[] = [
        {
            value: 0,
            label: "Falso"
        },
        {
            value: 1,
            label: "Verdadero"
        }
    ]

    return options;
}

export const FileRules = {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
    ],
}
