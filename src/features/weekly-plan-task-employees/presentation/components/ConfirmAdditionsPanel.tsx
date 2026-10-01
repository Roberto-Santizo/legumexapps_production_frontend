import { XIcon } from "lucide-react";
import { EmployeeIdentity, EmployeeSelect, type EmployeeOption, type WeeklyPlanEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    added: WeeklyPlanEmployee[];
    options: EmployeeOption[];
    isLoadingOptions: boolean;
    onAdd: (employeeId: number) => void;
    onRemove: (employeeId: number) => void;
}

export function ConfirmAdditionsPanel({ added, options, isLoadingOptions, onAdd, onRemove }: Props) {
    return (
        <section className="space-y-3">
            <div>
                <h3 className="text-sm font-semibold text-ink">Altas sin reemplazo</h3>
                <p className="mt-0.5 text-xs text-ink-muted">Empleados del plan que se suman a la tarea sin ocupar el lugar de un candidato.</p>
            </div>

            <div className="overflow-hidden rounded-xl border border-line bg-surface">
                <div className="border-b border-line px-5 py-4">
                    <EmployeeSelect
                        ariaLabel="Agregar empleado a la tarea"
                        options={options}
                        onChange={(employeeId) => employeeId && onAdd(employeeId)}
                        placeholder="Agregar empleado del plan"
                        isLoading={isLoadingOptions}
                        isClearable={false}
                    />
                </div>

                {added.length === 0 && (
                    <p className="px-5 py-6 text-center text-sm text-ink-subtle">Sin altas. Los candidatos confirmados serán el personal de la tarea.</p>
                )}

                <ul className="divide-y divide-line">
                    {added.map((employee) => (
                        <li key={employee.id} className="flex items-center justify-between gap-3 px-5 py-3">
                            <EmployeeIdentity name={employee.name} code={employee.code} position={employee.position} />

                            <button
                                type="button"
                                onClick={() => onRemove(employee.id)}
                                aria-label={`Quitar alta de ${employee.name}`}
                                className="cursor-pointer rounded-md p-1.5 text-ink-subtle transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
                            >
                                <XIcon className="size-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
