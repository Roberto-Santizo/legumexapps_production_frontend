import { StatusTag } from "@/features/shared/shared";
import { formatAcceptedPercentage, formatPerformanceLbs, paymentMethodLabel, PerformanceCoverageChart, type Performance } from "@/features/performances/performances";

type Props = {
    performance: Performance;
}

export function PerformanceHeader({ performance }: Props) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div className="min-w-0">
                <p className="text-sm text-ink-muted">SKU de línea</p>
                <h1 className="mt-1 flex flex-wrap items-baseline gap-x-3 text-[26px] font-semibold tracking-tight text-ink">
                    <span className="font-mono">{performance.sku}</span>
                    <span className="text-ink-muted">{performance.line}</span>
                </h1>
            </div>

            <div className="flex w-full flex-wrap items-end gap-x-8 gap-y-4 sm:w-auto">
                <dl className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                    <div>
                        <dt className="text-xs text-ink-muted">Rendimiento</dt>
                        <dd className="mt-0.5 font-mono font-medium tabular-nums text-ink">{formatPerformanceLbs(performance.lbs_performance)}</dd>
                    </div>
                    <div>
                        <dt className="text-xs text-ink-muted">Aceptado</dt>
                        <dd className="mt-0.5 font-mono font-medium tabular-nums text-ink">{formatAcceptedPercentage(performance.accepted_percentage)}</dd>
                    </div>
                    <div>
                        <dt className="text-xs text-ink-muted">Método de pago</dt>
                        <dd className="mt-0.5 font-medium text-ink">{paymentMethodLabel(performance.payment_method)}</dd>
                    </div>
                    <div>
                        <dt className="text-xs text-ink-muted">Estado</dt>
                        <dd className="mt-0.5"><StatusTag flag={performance.status} /></dd>
                    </div>
                </dl>

                <PerformanceCoverageChart performance={performance} />
            </div>
        </header>
    )
}
