import { ArrowRightIcon } from "lucide-react";
import { EmployeeSelect, type EmployeeOption } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    name: string;
    options: EmployeeOption[];
    isLoading: boolean;
    onPick: (employeeId: string) => void;
    onCancel: () => void;
}

export function BoardCardReplaceField({ name, options, isLoading, onPick, onCancel }: Props) {
    return (
        <div className="space-y-2 border-t border-line bg-canvas/50 px-2.5 py-2.5">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                <ArrowRightIcon className="size-3" aria-hidden="true" />
                Entra en lugar de {name}
            </p>

            <EmployeeSelect
                ariaLabel={`Elegir reemplazo de ${name}`}
                options={options}
                onChange={(employeeId) => employeeId && onPick(employeeId)}
                isLoading={isLoading}
                isClearable={false}
                autoFocus
            />

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
                >
                    Cancelar
                </button>
            </div>
        </div>
    )
}
