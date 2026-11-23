import { HistoryIcon, Loader2Icon } from "lucide-react";
import { UnavailableEmployeesAlert, type PreviousEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    isPending: boolean;
    disabled: boolean;
    unavailable: PreviousEmployee[];
    onLoad: () => void;
}

export function LoadPreviousConfigurationPanel({ isPending, disabled, unavailable, onLoad }: Props) {
    return (
        <section aria-labelledby="load-previous-configuration-title" className="space-y-3">
            <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:gap-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-canvas text-ink-muted ring-1 ring-inset ring-line">
                    <HistoryIcon className="size-5" aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1 space-y-1">
                    <h3 id="load-previous-configuration-title" className="text-sm font-semibold text-ink">Configuración anterior</h3>
                    <p className="max-w-2xl text-sm text-ink-muted">
                        Coloca en el tablero al personal de la última tarea finalizada de la línea, cada uno en su actividad. Puedes ajustarlo antes de confirmar.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onLoad}
                    disabled={isPending || disabled}
                    className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isPending
                        ? <Loader2Icon className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                        : <HistoryIcon className="size-4" aria-hidden="true" />}
                    Cargar configuración anterior
                </button>
            </div>

            <UnavailableEmployeesAlert employees={unavailable} />
        </section>
    )
}
