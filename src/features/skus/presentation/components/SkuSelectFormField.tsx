import { AsyncSelectFormField, type Option } from "@/features/shared/shared";
import { searchSkuOptions } from "@/features/skus/skus";
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

export function SkuSelectFormField<T extends FieldValues>({ label = 'SKU', ...props }: Props<T>) {
    return (
        <AsyncSelectFormField<T>
            {...props}
            label={label}
            queryKey="searchSkuOptions"
            search={searchSkuOptions}
            placeholder="Buscar por código"
            noOptionsMessage="Ningún SKU coincide con ese código"
        />
    );
}
