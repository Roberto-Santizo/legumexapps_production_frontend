import { AlertTriangleIcon } from "lucide-react";
import { exceedsCapacity } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    capacity: number;
    candidates: number;
}

export function ActivityCapacityAlert({ capacity, candidates }: Props) {
    if (!exceedsCapacity(capacity, candidates)) return null;

    return (
        <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50/60 px-5 py-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                <AlertTriangleIcon className="size-4" aria-hidden="true" />
                Más candidatos que lugares
            </p>

            <p className="mt-1 pl-6 text-sm text-amber-700">
                La línea admite {capacity} personas entre todas sus actividades y hay {candidates} candidatos. Quita a {candidates - capacity} antes de confirmar.
            </p>
        </div>
    )
}
