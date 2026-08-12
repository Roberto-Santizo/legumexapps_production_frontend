type Props = {
    label: string;
    value: string;
    mono?: boolean;
}

export function InformationField({ label, value, mono }: Props) {
    return (
        <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
                {label}
            </p>

            <p className={`mt-0.5 truncate text-sm text-ink ${mono ? 'font-mono tabular-nums' : ''}`} title={value}>
                {value}
            </p>
        </div>
    )
}
