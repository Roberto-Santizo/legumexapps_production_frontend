import { EmployeeIdentity } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    name: string;
    code: string;
    position: string;
}

export function OutgoingEmployeeCard({ name, code, position }: Props) {
    return (
        <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Sale</p>
            <div className="flex items-center gap-3 rounded-lg border border-line bg-canvas/60 px-3 py-3">
                <EmployeeIdentity name={name} code={code} position={position} />
            </div>
            <p className="text-xs text-ink-muted">Quien entre ocupará la posición {position} en esta tarea.</p>
        </div>
    )
}
