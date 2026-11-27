import type { Performance } from "@/features/performances/performances";

export const paymentMethodLabel = (paymentMethod: Performance['payment_method']): string =>
    paymentMethod ? 'Horas Línea' : 'Horas Rendimiento';

export const formatPerformanceLbs = (lbs: number): string => `${lbs} lbs`;

export const formatAcceptedPercentage = (percentage: number): string => `${percentage}%`;

export const configurationsCountLabel = (count: number): string =>
    `${count} ${count === 1 ? 'SKU configurado' : 'SKUs configurados'}`;
