import { createPerformancePath, editPerformancePath, LinePerformancesEmptyState, LinePerformancesHeader, PerformancesTable, showPerformancePath, useDeletePerformance, useLinePerformances, useTogglePerformanceStatus } from "@/features/performances/performances";
import { useNavigate } from "react-router-dom";

type Props = {
    lineCode: string;
}

export function LinePerformances({ lineCode }: Props) {
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useLinePerformances(lineCode);
    const { handleDeletePerformance } = useDeletePerformance();
    const { toggleStatus } = useTogglePerformanceStatus();

    const performances = data?.data ?? [];
    const goToCreate = () => navigate(createPerformancePath(lineCode));

    return (
        <section className="space-y-4">
            <LinePerformancesHeader count={performances.length} onAdd={goToCreate} />

            {isLoading && (
                <div className="space-y-px overflow-hidden rounded-xl border border-line bg-surface">
                    {[0, 1, 2].map(index => (
                        <div key={index} className="flex animate-pulse gap-6 px-5 py-4 motion-reduce:animate-none">
                            <span className="h-2.5 w-20 rounded-full bg-canvas" />
                            <span className="h-2.5 flex-1 rounded-full bg-canvas" />
                        </div>
                    ))}
                </div>
            )}

            {isError && <p className="rounded-xl border border-line bg-surface px-5 py-10 text-center text-sm text-ink-muted">{error.message}</p>}

            {data && performances.length === 0 && <LinePerformancesEmptyState onAdd={goToCreate} />}

            {performances.length > 0 && (
                <PerformancesTable
                    performances={performances}
                    hideLine
                    onShow={item => navigate(showPerformancePath(item.id))}
                    onEdit={item => navigate(editPerformancePath(item.id, lineCode))}
                    onDelete={handleDeletePerformance}
                    onToggleStatus={item => toggleStatus(item.id)}
                />
            )}
        </section>
    )
}
