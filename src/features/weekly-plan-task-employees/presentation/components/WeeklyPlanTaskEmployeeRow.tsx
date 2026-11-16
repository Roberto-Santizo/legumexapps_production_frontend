import { ClipboardListIcon, UserMinusIcon } from "lucide-react";
import { AssignmentActivityLabel, EmployeeIdentity, type WeeklyPlanTaskEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    assignment: WeeklyPlanTaskEmployee;
    editable: boolean;
    canRemove: boolean;
    onChangeActivity: () => void;
    onRemove: () => void;
}

const ACTION_CLASS = 'inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-ink';

export function WeeklyPlanTaskEmployeeRow({ assignment, editable, canRemove, onChangeActivity, onRemove }: Props) {
    const missingActivity = assignment.line_activity_id === null;

    return (
        <article className={`flex flex-col gap-3 border-l-[3px] px-5 py-4 transition-colors hover:border-ink hover:bg-canvas/60 motion-reduce:transition-none sm:flex-row sm:items-center sm:justify-between ${missingActivity ? 'border-amber-300' : 'border-transparent'}`}>
            <div className="min-w-0 space-y-1.5">
                <EmployeeIdentity name={assignment.name} code={assignment.code} position={assignment.position} zoomablePhoto />

                <AssignmentActivityLabel assignment={assignment} />
            </div>

            {editable && (
                <div className="flex shrink-0 items-center gap-1 sm:justify-end">
                    <button type="button" onClick={onChangeActivity} className={`${ACTION_CLASS} ${missingActivity ? 'text-ink' : ''}`}>
                        <ClipboardListIcon className="size-3.5" aria-hidden="true" />
                        {missingActivity ? 'Asignar actividad' : 'Cambiar actividad'}
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
