import { CheckIcon } from "lucide-react";
import { CustomFilledButton } from "@/features/shared/shared";
import type { ConfirmSummary } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    summary: ConfirmSummary;
    blockReason: string | null;
    isPending: boolean;
    onConfirm: () => void;
    onReset: () => void;
}

function SummaryFigure({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-sm text-ink">{value}</span>
            <span className="text-xs text-ink-muted">{label}</span>
        </div>
    )
}

export function ConfirmSummaryBar({ summary, blockReason, isPending, onConfirm, onReset }: Props) {
    const hasChanges = summary.replacements + summary.additions + summary.removals + summary.pendingReplacements > 0;

    return (
        <div className="sticky bottom-4 z-10 rounded-xl border border-line-strong bg-surface/95 px-5 py-4 shadow-lg backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div className="flex items-baseline gap-2">
                        <span className="font-mono text-2xl tracking-tight text-ink">{summary.finalCount}</span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Personal final</span>
                    </div>

                    <SummaryFigure label="reemplazos" value={summary.replacements} />
                    <SummaryFigure label="altas" value={summary.additions} />
                    <SummaryFigure label="bajas" value={summary.removals} />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    {blockReason && <p className="text-xs text-ink-muted" role="status">{blockReason}</p>}

                    {hasChanges && (
                        <button
                            type="button"
                            onClick={onReset}
                            disabled={isPending}
                            className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-ink disabled:cursor-not-allowed"
                        >
                            Descartar cambios
                        </button>
                    )}

                    <CustomFilledButton
                        type="button"
                        label="Confirmar personal"
                        icon={<CheckIcon className="size-4" />}
                        onClick={onConfirm}
                        disabled={isPending || blockReason !== null}
                        isLoading={isPending}
                    />
                </div>
            </div>
        </div>
    )
}
