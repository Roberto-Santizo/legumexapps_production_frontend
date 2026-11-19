import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, UsersIcon } from "lucide-react";
import { CustomFilledButton } from "@/features/shared/shared";
import { getSummaryStatusLabel, SummaryFigure, type ConfirmSummary } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    summary: ConfirmSummary;
    blockReason: string | null;
    hasChanges: boolean;
    isPending: boolean;
    onConfirm: () => void;
    onReset: () => void;
}

export function ConfirmSummaryBubble({ summary, blockReason, hasChanges, isPending, onConfirm, onReset }: Props) {
    const ready = blockReason === null;

    return (
        <Popover className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
            <PopoverButton
                aria-label={`Resumen del personal: ${summary.finalCount} empleados, ${getSummaryStatusLabel(summary, ready)}`}
                className="group flex h-12 cursor-pointer items-center gap-3 rounded-full bg-ink pl-4 pr-3 text-surface shadow-xl shadow-ink/20 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink data-open:translate-y-0 motion-reduce:transition-none"
            >
                <UsersIcon className="size-4 opacity-70" aria-hidden="true" />
                <span className="font-mono text-base tabular-nums">{summary.finalCount}</span>

                <span className="h-5 w-px bg-surface/20" aria-hidden="true" />

                <span className="flex items-center gap-1.5 text-xs font-medium">
                    {ready
                        ? <CheckIcon className="size-3.5" strokeWidth={3} aria-hidden="true" />
                        : <span className="size-2 rounded-full bg-amber-400" aria-hidden="true" />}
                    <span className="hidden sm:inline">{getSummaryStatusLabel(summary, ready)}</span>
                </span>

                <ChevronDownIcon className="size-4 rotate-180 opacity-60 transition-transform group-data-open:rotate-0 motion-reduce:transition-none" aria-hidden="true" />
            </PopoverButton>

            <PopoverPanel
                anchor={{ to: 'top end', gap: 12 }}
                transition
                className="z-40 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-line-strong bg-surface p-4 shadow-2xl transition duration-150 ease-out data-closed:translate-y-2 data-closed:opacity-0 motion-reduce:transition-none"
            >
                {({ close }) => (
                    <div className="space-y-4">
                        <div className="flex items-baseline justify-between gap-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Personal final</p>
                            <p className="font-mono text-3xl tracking-tight text-ink">{summary.finalCount}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <SummaryFigure label="reemplazos" value={summary.replacements} />
                            <SummaryFigure label="altas" value={summary.additions} />
                            <SummaryFigure label="bajas" value={summary.removals} />
                            <SummaryFigure label="sin actividad" value={summary.pendingActivities} highlight={summary.pendingActivities > 0} />
                        </div>

                        {blockReason && (
                            <p role="status" className="rounded-lg bg-canvas px-3 py-2 text-xs text-ink-muted">{blockReason}</p>
                        )}

                        <div className="flex flex-col gap-2">
                            <CustomFilledButton
                                type="button"
                                label="Confirmar personal"
                                icon={<CheckIcon className="size-4" />}
                                onClick={() => {
                                    close();
                                    onConfirm();
                                }}
                                disabled={isPending || !ready}
                                isLoading={isPending}
                                fullWitdh
                            />

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
                        </div>
                    </div>
                )}
            </PopoverPanel>
        </Popover>
    )
}
