import type { Line } from "@/features/lines/lines";
import { ChevronDownIcon, PackageIcon, WorkflowIcon, XIcon } from "lucide-react";

type Props = {
    lines: Line[];
    lineId: string;
    skuSearch: string;
    hasFilters: boolean;
    searching: boolean;
    onLineChange: (lineId: string) => void;
    onSkuSearchChange: (skuSearch: string) => void;
    onClear: () => void;
}

export function DrawerTasksFilters({ lines, lineId, skuSearch, hasFilters, searching, onLineChange, onSkuSearchChange, onClear }: Props) {
    return (
        <div className="mb-6 space-y-2">
            <div className="grid gap-2 sm:grid-cols-2">
                <label className="relative block">
                    <span className="sr-only">Línea</span>
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink-subtle">
                        <WorkflowIcon className="size-4" />
                    </span>
                    <select
                        value={lineId}
                        onChange={(e) => onLineChange(e.target.value)}
                        className={`w-full cursor-pointer appearance-none rounded-lg border border-line bg-canvas py-1.5 pl-9 pr-8 text-sm transition focus:border-ink focus:bg-surface focus:outline-none focus:ring-2 focus:ring-ink/10 ${lineId ? 'text-ink' : 'text-ink-subtle'}`}
                    >
                        <option value="">Todas las líneas</option>
                        {lines.map((line) => (
                            <option key={line.id} value={line.id}>{line.name}</option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-ink-subtle">
                        <ChevronDownIcon className="size-4" />
                    </span>
                </label>

                <label className="relative block">
                    <span className="sr-only">Código de SKU</span>
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink-subtle">
                        <PackageIcon className="size-4" />
                    </span>
                    <input
                        type="search"
                        value={skuSearch}
                        onChange={(e) => onSkuSearchChange(e.target.value)}
                        placeholder="Buscar código de SKU"
                        className="w-full rounded-lg border border-line bg-canvas py-1.5 pl-9 pr-3 text-sm text-ink transition placeholder:text-ink-subtle focus:border-ink focus:bg-surface focus:outline-none focus:ring-2 focus:ring-ink/10"
                    />
                </label>
            </div>

            <div className="flex h-5 items-center justify-between text-xs text-ink-subtle">
                <span className="tabular-nums" aria-live="polite">
                    {searching ? 'Buscando…' : ''}
                </span>
                {hasFilters && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="inline-flex cursor-pointer items-center gap-1 rounded text-ink-muted transition hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
                    >
                        <XIcon className="size-3.5" />
                        Limpiar filtros
                    </button>
                )}
            </div>
        </div>
    );
}
