type Props = {
    flag: number | boolean;
    onClick?: () => void;
}

export function StatusTag({ flag, onClick }: Props) {
    const active = Boolean(flag);
    const label = active ? 'Activo' : 'Inactivo';
    const tone = active
        ? 'bg-emerald-50 text-emerald-800 ring-emerald-200'
        : 'bg-canvas text-ink-muted ring-line-strong';
    const dot = active ? 'bg-emerald-500' : 'bg-ink-subtle';
    const base = `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium tracking-wide ring-1 ring-inset whitespace-nowrap ${tone}`;

    const content = (
        <>
            <span className={`relative flex size-1.5`}>
                {active && <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />}
                <span className={`relative inline-flex size-1.5 rounded-full ${dot}`} />
            </span>
            {label}
        </>
    );

    if (!onClick) {
        return <span className={base}>{content}</span>;
    }

    return (
        <button
            type="button"
            onClick={onClick}
            title={active ? 'Desactivar' : 'Activar'}
            className={`${base} cursor-pointer transition-colors hover:ring-ink-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:scale-[0.97]`}
        >
            {content}
        </button>
    );
}
