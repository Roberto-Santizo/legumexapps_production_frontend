import { lineDependenciesRepositoryProvider } from "@/features/line-dependencies/line-dependencies";
import { useQuery } from "@tanstack/react-query";
import { WorkflowIcon } from "lucide-react";
import type { Line } from "@/features/lines/lines";

type Props = {
    id: Line['id'];
}

export function LineDependenciesByLine({ id }: Props) {
    const { data } = useQuery({
        queryKey: ['getLineDependencies', id],
        queryFn: () => lineDependenciesRepositoryProvider.getLineDependencies(`${id}`)
    });

    if (data) return (
        <div>
            {data.length ? (
                <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                    <div className="border-b border-line px-5 py-4">
                        <div className="flex items-center gap-2">
                            <WorkflowIcon className="size-4 text-ink-subtle" />

                            <div>
                                <h3 className="text-sm font-semibold text-ink">
                                    Líneas relacionadas
                                </h3>

                                <p className="mt-0.5 text-xs text-ink-muted">
                                    Líneas que pueden activarse junto con esta línea
                                </p>
                            </div>
                        </div>
                    </div>

                    <ul className="divide-y divide-line">
                        {data.map((dependency, index) => (
                            <li
                                key={dependency.id}
                                className="group relative flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-muted"
                            >
                                <div className="relative flex size-9 shrink-0 items-center justify-center">
                                    {index < data.length - 1 && (
                                        <span
                                            className="absolute left-1/2 top-1/2 h-[calc(100%+1rem)] w-px -translate-x-1/2 bg-line"
                                            aria-hidden="true"
                                        />
                                    )}

                                    <span
                                        className="relative z-10 size-3 rounded-full bg-primary ring-4 ring-surface transition-transform group-hover:scale-110"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-ink">
                                        {dependency.line_dependant_name}
                                    </p>

                                    <p className="mt-0.5 text-xs text-ink-muted">
                                        Línea dependiente
                                    </p>
                                </div>

                                <div className="shrink-0 text-right">
                                    <span className="text-[11px] font-medium uppercase tracking-wide text-ink-subtle">
                                        Posiciones
                                    </span>

                                    <div className="mt-1 flex justify-end">
                                        <span className="rounded-lg border border-line bg-surface-muted px-2.5 py-1 font-mono text-xs font-medium text-ink">
                                            {dependency.positions}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface py-10 text-center">
                    <WorkflowIcon className="size-6 text-ink-subtle" />
                    <p className="text-sm text-ink-muted">Esta línea no tiene posiciones registradas</p>
                </div>
            )}
        </div>
    )
}
