import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

export const lineActivityQuantityRules = <T extends FieldValues>(): RegisterOptions<T, Path<T>> => ({
    required: 'La cantidad es obligatoria.',
    valueAsNumber: true,
    min: { value: 1, message: 'La cantidad debe ser al menos 1.' },
    validate: (value) => Number.isInteger(Number(value)) || 'La cantidad debe ser un número entero.'
});
