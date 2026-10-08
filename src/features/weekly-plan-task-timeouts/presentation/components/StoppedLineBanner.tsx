import { formatTimeoutTime, StoppedLineChronometer, StoppedLineTag, type WeeklyPlanTaskTimeout } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";
import type { ReactNode } from "react";

type Props = {
    timeout: WeeklyPlanTaskTimeout;
    action?: ReactNode;
}

export function StoppedLineBanner({ timeout, action }: Props) {
    return (
        <div className="overflow-hidden rounded-xl border border-[#a3402f]/25 bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-4 border-l-[3px] border-[#a3402f] px-5 py-4">
                <div className="min-w-0 space-y-2">
                    <StoppedLineTag />
                    <p className="truncate text-sm font-semibold text-ink" title={timeout.timeout_name}>{timeout.timeout_name}</p>
                    <p className="font-mono text-[11px] tabular-nums text-ink-subtle">
                        Desde las {formatTimeoutTime(timeout.start_date)} · {timeout.user_name}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <StoppedLineChronometer startDate={timeout.start_date} />
                    {action}
                </div>
            </div>

            {timeout.observation && (
                <p className="border-t border-line bg-canvas/50 px-5 py-3 text-sm text-ink-muted">{timeout.observation}</p>
            )}
        </div>
    )
}
