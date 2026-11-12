import type { RegisterOptions } from "react-hook-form";

export const lineActivityQuantityRules: RegisterOptions = {
    required: 'La cantidad es obligatoria.',
    valueAsNumber: true,
    min: { value: 1, message: 'La cantidad debe ser al menos 1.' },
    validate: (value: number) => Number.isInteger(value) || 'La cantidad debe ser un número entero.'
};
