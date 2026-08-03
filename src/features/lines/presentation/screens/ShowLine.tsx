import { ErrorComponent, Loading, Title } from "@/features/shared/shared";
import { linesRepositoryProvider } from "@/features/lines/lines";
import { MoonIcon, SunIcon, WorkflowIcon } from "lucide-react";
import { positionProvider } from "@/features/positions/positions";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowLine() {
    const { id } = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getLineByCode', id],
        queryFn: () => linesRepositoryProvider.getLineByCode(id!),
        retry: false
    });

    const { data: positions, isLoading: isLoadingPositions } = useQuery({
        queryKey: ['getPositionsByLineCode', id],
        queryFn: () => positionProvider.getPositions('', '', id!),
    });

    if (isLoading || isLoadingPositions) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data && positions) {
        const activeCount = positions.data.filter(position => !position.status).length;
        const inactiveCount = positions.data.length - activeCount;

        return (
            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Title title="Línea" subtitle="Información de la línea" />

                    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink">
                        {data.shift ? <SunIcon className="size-4 text-ink-muted" /> : <MoonIcon className="size-4 text-ink-muted" />}
                        Turno {data.shift ? 'AM' : 'PM'}
                    </span>
                </div>

                <section className="grid grid-cols-1 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    <div className="p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Código</p>
                        <p className="mt-2 font-mono text-3xl tracking-tight text-ink">{data.code}</p>
                    </div>

                    <div className="p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Nombre</p>
                        <p className="mt-2 text-lg font-medium text-ink">{data.name}</p>
                    </div>

                    <div className="p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Puestos</p>
                        <p className="mt-2 text-lg font-medium text-ink">{positions.data.length}</p>
                    </div>
                </section>

                <section className="space-y-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h2 className="text-sm font-semibold text-ink">Puestos de la línea</h2>

                        {positions.data.length > 0 && (
                            <p className="text-xs text-ink-muted">
                                {activeCount} {activeCount === 1 ? 'activo' : 'activos'} · {inactiveCount} {inactiveCount === 1 ? 'inactivo' : 'inactivos'}
                            </p>
                        )}
                    </div>

                    {positions.data.length ? (
                        <div className="relative overflow-hidden rounded-xl border border-line bg-surface">
                            <div className="absolute inset-y-5 left-[1.6rem] w-px bg-line" aria-hidden="true" />

                            <ul className="divide-y divide-line">
                                {positions.data.map(position => (
                                    <li key={position.id} className="relative flex items-center gap-4 px-5 py-4">
                                        <span
                                            className={`z-10 size-2.5 shrink-0 rounded-full ring-4 ring-surface ${position.status ? 'bg-line-strong' : 'bg-[#4d6b2f]'}`}
                                            aria-hidden="true"
                                        />

                                        <span className="w-24 shrink-0 font-mono text-sm text-ink-muted">{position.code}</span>

                                        <span className="flex-1 text-sm text-ink">{position.activity}</span>

                                        <span className={`text-xs font-medium ${position.status ? 'text-ink-subtle' : 'text-[#4d6b2f]'}`}>
                                            {position.status ? 'Inactivo' : 'Activo'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface py-10 text-center">
                            <WorkflowIcon className="size-6 text-ink-subtle" />
                            <p className="text-sm text-ink-muted">Esta línea no tiene puestos registrados</p>
                        </div>
                    )}
                </section>
            </div>
        )
    }
}
