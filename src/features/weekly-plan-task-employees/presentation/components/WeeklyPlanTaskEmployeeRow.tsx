import { RepeatIcon, UserMinusIcon } from "lucide-react";
import { EmployeeIdentity, formatReplacedEmployee, type WeeklyPlanTaskEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    assignment: WeeklyPlanTaskEmployee;
    editable: boolean;
    canRemove: boolean;
    onReplace: () => void;
    onRemove: () => void;
}

const ACTION_CLASS = 'inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-ink';

export function WeeklyPlanTaskEmployeeRow({ assignment, editable, canRemove, onReplace, onRemove }: Props) {
    const replacedLabel = formatReplacedEmployee(assignment);

    return (
        <article className="flex flex-col gap-3 border-l-[3px] border-transparent px-5 py-4 transition-colors hover:border-ink hover:bg-canvas/60 motion-reduce:transition-none sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 space-y-1.5">
                <EmployeeIdentity name={assignment.name} code={assignment.code} position={assignment.position} />

                {replacedLabel && (
                    <p className="flex items-center gap-1.5 text-xs text-ink-muted sm:pl-[108px]">
                        <RepeatIcon className="size-3.5 text-ink-subtle" aria-hidden="true" />
                        {replacedLabel}
                    </p>
                )}
            </div>

            {editable && (
                <div className="flex shrink-0 items-center gap-1 sm:justify-end">
                    <button type="button" onClick={onReplace} className={ACTION_CLASS}>
                        <RepeatIcon className="size-3.5" aria-hidden="true" />
                        Reemplazar
                    </button>

                    {canRemove && (
                        <button type="button" onClick={onRemove} className={ACTION_CLASS}>
                            <UserMinusIcon className="size-3.5" aria-hidden="true" />
                            Quitar
                        </button>
                    )}
                </div>
            )}
        </article>
    )
}
