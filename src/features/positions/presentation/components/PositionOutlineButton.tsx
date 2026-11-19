import type { ReactNode } from "react";

type Props = {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    danger?: boolean;
}

export function PositionOutlineButton({ label, icon, onClick, disabled = false, danger = false }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-40 [&>svg]:size-4 ${danger ? 'text-red-600 hover:bg-red-50' : 'text-ink hover:bg-canvas'}`}
        >
            {icon}
            {label}
        </button>
    )
}
