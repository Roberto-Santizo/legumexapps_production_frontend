type Props = {
    title: string;
    editable: boolean;
}

export function PerformanceRecordsPanelHeader({ title, editable }: Props) {
    return (
        <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-semibold text-ink">{title}</h2>
            {!editable && (
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">Solo lectura</p>
            )}
        </div>
    )
}
