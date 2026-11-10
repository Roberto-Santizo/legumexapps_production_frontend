import { AlertTriangleIcon } from "lucide-react";
import { exceedsTaskPositions } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    positions: number;
    candidates: number;
}

export function PositionsLimitAlert({ positions, candidates }: Props) {
    if (!exceedsTaskPositions(positions, candidates)) return null;

    return (
        <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50/60 px-5 py-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                <AlertTriangleIcon className="size-4" aria-hidden="true" />
                Diferencia entre posiciones
            </p>

            <p className="mt-1 pl-6 text-sm text-amber-700">
                La tarea tiene {positions} posiciones y la línea tiene {candidates} candidatos. Solo se asignarán {positions} empleados.
            </p>
        </div>
    )
}
