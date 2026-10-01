type Props = {
    name: string;
    code: string;
    position: string;
    struck?: boolean;
}

export function EmployeeIdentity({ name, code, position, struck = false }: Props) {
    return (
        <div className="flex min-w-0 items-center gap-3">
            <span className="w-24 shrink-0 rounded-md border border-line bg-canvas px-2 py-1 text-center font-mono text-[11px] tracking-wide text-ink-muted">
                {position}
            </span>

            <div className="min-w-0">
                <p className={`truncate text-sm font-medium ${struck ? 'text-ink-subtle line-through decoration-ink-subtle' : 'text-ink'}`}>{name}</p>
                <p className="font-mono text-[11px] text-ink-subtle">{code}</p>
            </div>
        </div>
    )
}
