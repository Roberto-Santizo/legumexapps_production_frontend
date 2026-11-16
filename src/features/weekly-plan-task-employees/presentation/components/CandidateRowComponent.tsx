import { ArrowRightIcon, ClipboardListIcon } from "lucide-react";
import { ActivitySelect, CandidateActionToggle, CandidateRowField, EmployeeIdentity, EmployeeSelect, type ActivityOption, type CandidateAction, type CandidateRow, type EmployeeOption } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    row: CandidateRow;
    replacementOptions: EmployeeOption[];
    activityOptions: ActivityOption[];
    isLoadingOptions: boolean;
    onActionChange: (action: CandidateAction) => void;
    onReplacementChange: (replacementId?: string) => void;
    onActivityChange: (lineActivityId?: number) => void;
}

export function CandidateRowComponent({ row, replacementOptions, activityOptions, isLoadingOptions, onActionChange, onReplacementChange, onActivityChange }: Props) {
    const { candidate, action, replacementId, lineActivityId } = row;
    const selectId = `replacement-${candidate.id}`;
    const activityId = `activity-${candidate.id}`;

    return (
        <article className={`border-l-[3px] px-5 py-4 transition-colors motion-reduce:transition-none ${action === 'keep' ? 'border-transparent' : 'border-ink bg-canvas/60'}`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <EmployeeIdentity
                    name={candidate.name}
                    code={candidate.code}
                    position={candidate.position}
                    struck={action !== 'keep'}
                    zoomablePhoto
                />

                <CandidateActionToggle value={action} onChange={onActionChange} candidateName={candidate.name} />
            </div>

            {action === 'replace' && (
                <CandidateRowField htmlFor={selectId} label="Entra" icon={<ArrowRightIcon className="size-3.5" aria-hidden="true" />}>
                    <EmployeeSelect
                        inputId={selectId}
                        options={replacementOptions}
                        value={replacementId}
                        onChange={onReplacementChange}
                        isLoading={isLoadingOptions}
                    />
                </CandidateRowField>
            )}

            {action !== 'remove' && (
                <CandidateRowField htmlFor={activityId} label="Actividad" icon={<ClipboardListIcon className="size-3.5" aria-hidden="true" />}>
                    <ActivitySelect id={activityId} options={activityOptions} value={lineActivityId} onChange={onActivityChange} />
                </CandidateRowField>
            )}

            {action === 'remove' && (
                <p className="mt-2 text-xs text-ink-muted sm:pl-[160px]">No trabajará en esta tarea.</p>
            )}
        </article>
    )
}
