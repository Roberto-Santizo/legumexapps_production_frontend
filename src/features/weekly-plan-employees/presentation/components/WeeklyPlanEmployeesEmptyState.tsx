import { FileSpreadsheetIcon, UploadIcon } from "lucide-react";

type Props = {
    onUpload: () => void;
}

export function WeeklyPlanEmployeesEmptyState({ onUpload }: Props) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line-strong bg-canvas/50 px-6 py-16 text-center">
            <span className="flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink-muted">
                <FileSpreadsheetIcon className="size-5" />
            </span>
            <div className="max-w-md space-y-1">
                <p className="text-sm font-semibold text-ink">Asigna empleados a sus posiciones por semana</p>
                <p className="text-xs text-ink-muted">
                    Sube un Excel con el código del empleado, la posición, la semana y el año. Cada empleado ocupa una sola posición por plan.
                </p>
            </div>
            <button
                type="button"
                onClick={onUpload}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink transition-colors duration-150 hover:border-line-strong hover:bg-canvas cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
            >
                <UploadIcon className="size-3.5" />
                Cargar archivo
            </button>
        </div>
    )
}
