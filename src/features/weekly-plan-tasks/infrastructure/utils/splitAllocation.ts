import type { SplitWeeklyPlanTaskForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export type SplitAllocationStatus = "pending" | "balanced" | "over";

export type SplitAllocation = {
    sum: number;
    difference: number;
    status: SplitAllocationStatus;
    shares: number[];
}

export const portionSwatches = ["bg-ink", "bg-ink/65", "bg-ink/40", "bg-ink/25"];

export const boxesFormat = new Intl.NumberFormat("es-GT");

export function getPortionSwatch(index: number): string {
    return portionSwatches[index % portionSwatches.length];
}

export function getSplitAllocation(portions: SplitWeeklyPlanTaskForm["portions"] | undefined, total: number): SplitAllocation {
    const boxes = (portions ?? []).map((portion) => Math.max(Number(portion?.boxes) || 0, 0));
    const sum = boxes.reduce((acc, value) => acc + value, 0);
    const base = Math.max(sum, total, 1);
    const difference = total - sum;
    const status: SplitAllocationStatus = difference === 0 ? "balanced" : difference > 0 ? "pending" : "over";

    return { sum, difference, status, shares: boxes.map((value) => (value / base) * 100) };
}

export function getSplitStatusLabel({ status, difference }: SplitAllocation): string {
    if (status === "balanced") return "Las porciones cubren todas las cajas";
    const amount = boxesFormat.format(Math.abs(difference));
    return status === "pending" ? `Faltan ${amount} cajas por asignar` : `Sobran ${amount} cajas, reduce alguna porción`;
}
