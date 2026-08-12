type StepProps = {
    label: string;
    date: string | null;
}

export function TimelineStep({ label, date }: StepProps) {
    return (
        <div className="flex flex-1 items-start gap-3 p-5">
            <span
                className={`mt-1 size-2.5 shrink-0 rounded-full ring-4 ring-surface ${date ? 'bg-ink' : 'border border-line-strong bg-surface'}`}
                aria-hidden="true"
            />

            <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">{label}</p>
                <p className={`mt-1.5 text-sm ${date ? 'font-medium text-ink' : 'text-ink-subtle'}`}>{date ?? 'Sin registrar'}</p>
            </div>
        </div>
    )
}