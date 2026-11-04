import { AsyncSelectFormField, type Option } from "@/features/shared/shared";
import { searchPackingMaterialOptions } from "@/features/packing-materials/packing-materials";
import type { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

type Props<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    validation: RegisterOptions<T, Path<T>>;
    label?: string;
    selectedOption?: Option | null;
    errorMessage?: string;
    disabled?: boolean;
};

export function PackingMaterialSelectFormField<T extends FieldValues>({ label = 'Material de Empaque', ...props }: Props<T>) {
    return (
        <AsyncSelectFormField<T>
            {...props}
            label={label}
            queryKey="searchPackingMaterialOptions"
            search={searchPackingMaterialOptions}
            placeholder="Buscar por código"
            noOptionsMessage="Ningún material coincide con ese código"
        />
    );
}
