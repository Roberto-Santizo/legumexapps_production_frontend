type Props = {
    checked: boolean;
    disabled?: boolean;
    label: string;
    onChange: (checked: boolean) => void;
}

export function LineFieldRequiredSwitch({ checked, disabled = false, label, onChange }: Props) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            disabled={disabled}
            onClick={() => onChange(!checked)}
            className="group inline-flex items-center gap-2 rounded-md py-1 text-xs font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-50"
        >
            <span className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors ${checked ? 'bg-ink' : 'bg-line-strong'}`}>
                <span className={`inline-block size-3 rounded-full bg-white shadow-sm transition-transform motion-reduce:transition-none ${checked ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
            </span>
            Obligatorio
        </button>
    )
}
