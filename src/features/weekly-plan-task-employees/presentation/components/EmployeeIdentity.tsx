import { EmployeePhoto } from "@/features/shared/shared";
import { formatPosition } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type TextProps = {
    name: string;
    code: string;
    position: string | null;
    struck?: boolean;
}

type Props = TextProps & {
    zoomablePhoto?: boolean;
}

export function EmployeeIdentityText({ name, code, position, struck = false }: TextProps) {
    return (
        <span className="flex min-w-0 items-center gap-3">
            <span className="w-24 shrink-0 rounded-md border border-line bg-canvas px-2 py-1 text-center font-mono text-[11px] tracking-wide text-ink-muted">
                {formatPosition(position)}
            </span>

            <span className="block min-w-0">
                <span className={`block truncate text-sm font-medium ${struck ? 'text-ink-subtle line-through decoration-ink-subtle' : 'text-ink'}`}>{name}</span>
                <span className="block font-mono text-[11px] text-ink-subtle">{code}</span>
            </span>
        </span>
    )
}

export function EmployeeIdentity({ name, code, position, struck = false, zoomablePhoto = false }: Props) {
    return (
        <div className="flex min-w-0 items-center gap-3">
            <EmployeePhoto
                code={code}
                name={name}
                zoomable={zoomablePhoto}
                detail={`${code} · ${formatPosition(position)}`}
                className={`aspect-[3/4] w-10 shrink-0 rounded-md border border-line motion-safe:transition-[filter,opacity] ${struck ? 'opacity-60 grayscale' : ''}`}
            />

            <EmployeeIdentityText name={name} code={code} position={position} struck={struck} />
        </div>
    )
}
