import { InformationField } from "@/features/shared/shared";
import type { WeeklyPlanEmployee } from "@/features/weekly-plan-employees/weekly-plan-employees";
import { ArrowRightIcon } from "lucide-react";

type Props = {
    employee: WeeklyPlanEmployee;
}

export function WeeklyPlanEmployeeDetail({ employee }: Props) {
    return (
        <section className="overflow-hidden rounded-xl border border-line bg-surface">
            <div className="flex flex-col gap-1 border-b border-line p-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Empleado</p>
                    <p className="mt-2 break-words text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{employee.name}</p>
                    <p className="mt-1 font-mono text-sm tabular-nums text-ink-muted">{employee.code}</p>
                </div>

                <p className="font-mono text-xs text-ink-subtle">Asignación #{employee.id}</p>
            </div>

            <div className="grid grid-cols-1 items-center gap-4 border-b border-line p-6 sm:grid-cols-[1fr_auto_1fr]">
                <div className="rounded-lg border border-dashed border-line-strong bg-canvas/60 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Puesto en biométrico</p>
                    <p className="mt-1.5 text-lg font-medium text-ink-muted">{employee.biometric_position ?? 'Sin registrar'}</p>
                </div>

                <ArrowRightIcon className="mx-auto size-5 rotate-90 text-ink-subtle sm:rotate-0" aria-hidden="true" />

                <div className="rounded-lg border border-ink bg-surface px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Posición en el plan</p>
                    <p className="mt-1.5 font-mono text-2xl tracking-tight text-ink">{employee.position}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 px-6 py-4">
                <InformationField label="ID asignación" value={`${employee.id}`} mono />
                <InformationField label="ID empleado" value={`${employee.employee_id}`} mono />
                <InformationField label="ID posición" value={`${employee.position_id}`} mono />
            </div>
        </section>
    )
}
