import { CornerDownRightIcon } from "lucide-react";

type Props = {
    onPlace?: () => void;
    placeLabel?: string;
}

const BASE_CLASS = 'flex min-h-[3.125rem] w-full items-center justify-center gap-1.5 rounded-lg border border-dashed text-[11px]';

export function EmptyPlace({ onPlace, placeLabel = 'Colocar aquí' }: Props) {
    if (!onPlace) {
        return <li className={`${BASE_CLASS} border-line-strong/80 bg-canvas/30 tracking-wide text-ink-subtle`}>Lugar libre</li>
    }

    return (
        <li>
            <button
                type="button"
                onClick={onPlace}
                className={`${BASE_CLASS} cursor-pointer border-ink/50 font-medium text-ink transition-colors hover:border-ink hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ink motion-reduce:transition-none`}
            >
                <CornerDownRightIcon className="size-3.5" aria-hidden="true" />
                {placeLabel}
            </button>
        </li>
    )
}
