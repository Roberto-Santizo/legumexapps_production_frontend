import type { Option } from "@/features/shared/shared";

export const lineWildcardLabel = (isWildcard: boolean): string => isWildcard ? 'Comodines' : 'Regular';

export const lineWildcardOptions: Option[] = [
    { value: 'true', label: 'Comodines' },
    { value: 'false', label: 'Regulares' }
];
