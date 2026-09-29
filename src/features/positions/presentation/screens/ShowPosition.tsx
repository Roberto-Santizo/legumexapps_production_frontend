import { ErrorComponent, Loading, Title } from "@/features/shared/shared";
import { positionProvider } from "@/features/positions/positions";
import { ArrowUpRightIcon, EditIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowPosition() {
    const { id } = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getPositionById', id],
        queryFn: () => positionProvider.getPositionById(id!),
        retry: false
    });

    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Title title="Puesto" subtitle="Información del puesto" />

                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink">
                        <span
                            className={`size-2 rounded-full ${data.status ? 'bg-[#4d6b2f]' : 'bg-line-strong'}`}
                            aria-hidden="true"
                        />
                        {data.status ? 'Activo' : 'Inactivo'}
                    </span>

                    <Link
                        to={`/posiciones/${data.id}/editar`}
                        className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                        <EditIcon className="size-4 text-ink-muted" />
                        Editar
                    </Link>
                </div>
            </div>

            <section className="overflow-hidden rounded-xl border border-line bg-surface">
                <div className="flex flex-col gap-1 border-b border-line p-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Código</p>
                        <p className="mt-2 break-all font-mono text-4xl tracking-tight text-ink sm:text-5xl">{data.code}</p>
                    </div>

                    <p className="font-mono text-xs text-ink-subtle">ID #{data.id}</p>
                </div>

                <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    <div className="p-5 sm:col-span-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Actividad</p>
                        <p className="mt-2 text-lg font-medium leading-snug text-ink">{data.activity}</p>
                    </div>

                    <Link
                        to={`/lineas/${data.line}`}
                        className="group p-5 transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink"
                    >
                        <p className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                            Línea
                            <ArrowUpRightIcon className="size-4 text-ink-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                        </p>
                        <p className="mt-2 font-mono text-lg text-ink">{data.line}</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}
