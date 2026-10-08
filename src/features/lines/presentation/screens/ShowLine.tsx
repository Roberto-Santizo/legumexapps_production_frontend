import { ErrorComponent, Loading, Title } from "@/features/shared/shared";
import { captureTypeDescriptions, captureTypeLabels } from "@/features/capture-fields/capture-fields";
import { LineDependenciesByLine } from "@/features/line-dependencies/line-dependencies";
import { linesRepositoryProvider } from "@/features/lines/lines";
import { MoonIcon, SunIcon } from "lucide-react";
import { PositionsByLine } from "@/features/positions/positions";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowLine() {
    const { id } = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getLineByCode', id],
        queryFn: () => linesRepositoryProvider.getLineByCode(id!),
        retry: false
    });

    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) {

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
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Familia de captura</p>
                        <p className="mt-2 text-lg font-medium text-ink">{captureTypeLabels[data.capture_type]}</p>
                        <p className="mt-0.5 text-xs text-ink-muted">{captureTypeDescriptions[data.capture_type]}</p>
                    </div>
                </section>

                <PositionsByLine code={data.code} />
                <LineDependenciesByLine id={data.id} />
            </div>
        )
    }
}
