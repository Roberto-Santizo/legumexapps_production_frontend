import { CornerDownRightIcon } from "lucide-react";
import { formatMissingPlaces } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    canPlace: boolean;
    missing: number;
    onPlace: () => void;
}

export function StationPlaceButton({ canPlace, missing, onPlace }: Props) {
    if (canPlace) {
        return (
            <button
                type="button"
                onClick={onPlace}
                className="inline-flex h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-ink px-4 text-sm font-semibold text-surface transition-colors hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
            >
                <CornerDownRightIcon className="size-4" aria-hidden="true" />
                Colocar aquí
            </button>
        )
    }

    if (missing > 0) return <span className="shrink-0 text-xs font-medium text-ink-muted">{formatMissingPlaces(missing)}</span>;

    return null;
}
