export function AssistantThinking() {
    return (
        <div className="flex items-center gap-3" aria-live="polite">
            <span className="relative h-0.5 w-16 overflow-hidden rounded-full bg-line">
                <span className="loading-sweep" />
            </span>
            <span className="font-mono text-[11px] tracking-wide text-ink-muted">Revisando la pregunta…</span>
        </div>
    )
}
