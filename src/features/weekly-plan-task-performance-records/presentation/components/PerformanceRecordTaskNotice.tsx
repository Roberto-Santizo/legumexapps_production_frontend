type Props = {
    title: string;
    message: string;
}

export function PerformanceRecordTaskNotice({ title, message }: Props) {
    return (
        <div className="rounded-xl border border-dashed border-line-strong bg-canvas/60 px-5 py-8 text-center">
            <p className="text-sm font-medium text-ink">{title}</p>
            <p className="mt-1 text-sm text-ink-muted">{message}</p>
        </div>
    )
}
