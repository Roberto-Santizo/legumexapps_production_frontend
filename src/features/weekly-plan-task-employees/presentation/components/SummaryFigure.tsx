type Props = {
    label: string;
    value: number;
    highlight?: boolean;
}

export function SummaryFigure({ label, value, highlight = false }: Props) {
    return (
        <div className={`rounded-lg border px-3 py-2 ${highlight ? 'border-amber-200 bg-amber-50/60' : 'border-line bg-canvas/40'}`}>
            <p className={`font-mono text-lg tabular-nums leading-none ${highlight ? 'text-amber-800' : 'text-ink'}`}>{value}</p>
            <p className={`mt-1 text-[11px] ${highlight ? 'text-amber-700' : 'text-ink-muted'}`}>{label}</p>
        </div>
    )
}
