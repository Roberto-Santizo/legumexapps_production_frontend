import { CalendarCheck2Icon, SearchXIcon } from "lucide-react";

type Props = {
    filtered: boolean;
    onClear: () => void;
}

export function DrawerTasksEmptyState({ filtered, onClear }: Props) {
    if (filtered) return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line-strong bg-canvas/50 px-6 py-16 text-center">
            <span className="flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink-muted">
                <SearchXIcon className="size-5" />
            </span>
            <div className="space-y-1">
                <p className="text-sm font-semibold text-ink">Ninguna tarea coincide con los filtros</p>
                <p className="text-xs text-ink-muted">Prueba con otra línea u otro código de SKU.</p>
            </div>
            <button
                type="button"
                onClick={onClear}
                className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors duration-150 hover:border-line-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
            >
                Limpiar filtros
            </button>
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line-strong bg-canvas/50 px-6 py-16 text-center">
            <span className="flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink-muted">
                <CalendarCheck2Icon className="size-5" />
            </span>
            <div className="space-y-1">
                <p className="text-sm font-semibold text-ink">Todas las tareas tienen fecha de operación</p>
                <p className="text-xs text-ink-muted">Las tareas nuevas sin programar aparecerán aquí.</p>
            </div>
        </div>
    );
}
