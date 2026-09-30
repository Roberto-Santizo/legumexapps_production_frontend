import { boxesFormat, getPortionSwatch, getSplitStatusLabel, type SplitAllocation } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

type Props = {
    allocation: SplitAllocation;
    total: number;
}

const statusTone = {
    balanced: "text-ink",
    pending: "text-ink-muted",
    over: "text-red-600",
};

export function SplitAllocationMeter({ allocation, total }: Props) {
    const { status, sum, shares } = allocation;
    const totalMark = sum > total ? (total / sum) * 100 : 100;

    return (
        <div className="space-y-2.5" aria-live="polite">
            <div className="relative h-2.5 overflow-hidden rounded-full bg-canvas ring-1 ring-inset ring-line">
                <div className="flex h-full gap-px">
                    {shares.map((share, index) => (
                        <div
                            key={index}
                            style={{ width: `${share}%` }}
                            className={`h-full transition-[width] duration-300 ease-out motion-reduce:transition-none ${getPortionSwatch(index)}`}
                        />
                    ))}
                </div>
                {status === "over" && (
                    <div
                        style={{ left: `${totalMark}%` }}
                        className="absolute inset-y-0 right-0 bg-red-500/70"
                    />
                )}
            </div>

            <div className="flex items-center justify-between gap-3 text-xs">
                <p className={`inline-flex items-center gap-1.5 font-medium ${statusTone[status]}`}>
                    {status === "balanced" ? <CheckCircle2Icon className="size-3.5" /> : <AlertCircleIcon className="size-3.5" />}
                    {getSplitStatusLabel(allocation)}
                </p>
                <p className="shrink-0 font-mono tabular-nums text-ink-subtle">
                    <span className={status === "over" ? "text-red-600" : "text-ink"}>{boxesFormat.format(sum)}</span>
                    {" / "}
                    {boxesFormat.format(total)}
                </p>
            </div>
        </div>
    );
}
