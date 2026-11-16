import { SearchIcon, XIcon } from "lucide-react";

type Props = {
    value: string;
    onChange: (value: string) => void;
    total: number;
    matches: number;
}

export function PoolSearchField({ value, onChange, total, matches }: Props) {
    const filtering = value.trim() !== '';

    return (
        <div className="border-b border-line px-2.5 py-2.5">
            <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" aria-hidden="true" />

                <input
                    type="search"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder="Buscar por nombre, código o posición"
                    aria-label="Buscar empleado por asignar"
                    className="h-10 w-full rounded-lg border border-line bg-surface pl-9 pr-9 text-sm text-ink shadow-sm transition-colors placeholder:text-ink-subtle hover:border-line-strong focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/10 [&::-webkit-search-cancel-button]:hidden"
                />

                {filtering && (
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        aria-label="Limpiar búsqueda"
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1.5 text-ink-subtle transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
                    >
                        <XIcon className="size-3.5" />
                    </button>
                )}
            </div>

            {filtering && (
                <p className="mt-1.5 px-1 font-mono text-[11px] text-ink-subtle" aria-live="polite">{matches} de {total}</p>
            )}
        </div>
    )
}
