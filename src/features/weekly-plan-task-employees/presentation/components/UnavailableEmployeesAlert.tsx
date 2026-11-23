import { Collapse } from "@/features/shared/shared";
import { AlertTriangleIcon } from "lucide-react";
import { formatUnavailableTitle, type PreviousEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    employees: PreviousEmployee[];
}

export function UnavailableEmployeesAlert({ employees }: Props) {
    return (
        <Collapse show={employees.length > 0}>
            <div role="status" className="rounded-xl border border-amber-200 bg-amber-50/60 px-5 py-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                    <AlertTriangleIcon className="size-4 shrink-0" aria-hidden="true" />
                    {formatUnavailableTitle(employees.length)}
                </p>

                <p className="mt-1 pl-6 text-sm text-amber-700">
                    No aparecen entre los candidatos de la línea ni entre los reemplazos. Revisa sus lugares antes de confirmar.
                </p>

                <ul className="mt-2 grid gap-x-6 gap-y-1 pl-6 text-sm text-amber-800 sm:grid-cols-2">
                    {employees.map(({ code, name }) => (
                        <li key={code} className="flex min-w-0 items-baseline gap-2">
                            <span className="font-mono text-xs">{code}</span>
                            <span className="truncate">{name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </Collapse>
    )
}
