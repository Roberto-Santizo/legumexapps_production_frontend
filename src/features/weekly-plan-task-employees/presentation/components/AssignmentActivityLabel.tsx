import { getPositionActivityNote, type WeeklyPlanTaskEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    assignment: WeeklyPlanTaskEmployee;
}

export function AssignmentActivityLabel({ assignment }: Props) {
    const note = getPositionActivityNote(assignment);

    return (
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs sm:pl-[160px]">
            {assignment.activity ? (
                <>
                    <span className="font-medium tracking-wide text-ink">{assignment.activity}</span>
                    {assignment.unit && <span className="font-mono text-[11px] text-ink-subtle">{assignment.unit}</span>}
                </>
            ) : (
                <span className="rounded-md border border-dashed border-amber-300 bg-amber-50/60 px-2 py-0.5 font-medium text-amber-800">Sin actividad</span>
            )}

            {note && <span className="text-ink-muted">{note}</span>}
        </p>
    )
}
