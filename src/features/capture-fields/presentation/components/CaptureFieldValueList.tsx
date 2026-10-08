type Props = {
    title: string;
    values: string[];
    emptyMessage: string;
    mono?: boolean;
}

export function CaptureFieldValueList({ title, values, emptyMessage, mono = false }: Props) {
    return (
        <div className="rounded-xl border border-line bg-surface px-5 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">{title}</p>

            {values.length ? (
                <ol className="mt-3 flex flex-wrap gap-2">
                    {values.map(value => (
                        <li key={value} className={`rounded-md border border-line bg-canvas px-2 py-1 text-sm text-ink ${mono ? 'font-mono text-xs' : ''}`}>
                            {value}
                        </li>
                    ))}
                </ol>
            ) : (
                <p className="mt-2 text-sm text-ink-muted">{emptyMessage}</p>
            )}
        </div>
    )
}
