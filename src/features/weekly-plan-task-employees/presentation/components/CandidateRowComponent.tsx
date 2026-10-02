import { ArrowRightIcon } from "lucide-react";
import { CandidateActionToggle, EmployeeIdentity, EmployeeSelect, type CandidateAction, type CandidateRow, type EmployeeOption } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    row: CandidateRow;
    replacementOptions: EmployeeOption[];
    isLoadingOptions: boolean;
    onActionChange: (action: CandidateAction) => void;
    onReplacementChange: (replacementId?: number) => void;
}

export function CandidateRowComponent({ row, replacementOptions, isLoadingOptions, onActionChange, onReplacementChange }: Props) {
    const { candidate, action, replacementId } = row;
    const selectId = `replacement-${candidate.id}`;

    return (
        <article className={`border-l-[3px] px-5 py-4 transition-colors motion-reduce:transition-none ${action === 'keep' ? 'border-transparent' : 'border-ink bg-canvas/60'}`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <EmployeeIdentity
                    name={candidate.name}
                    code={candidate.code}
                    position={candidate.position}
                    struck={action !== 'keep'}
                />

                <CandidateActionToggle value={action} onChange={onActionChange} candidateName={candidate.name} />
            </div>

            {action === 'replace' && (
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:pl-[108px]">
                    <label htmlFor={selectId} className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                        <ArrowRightIcon className="size-3.5" aria-hidden="true" />
                        Entra
                    </label>

                    <div className="min-w-0 flex-1">
                        <EmployeeSelect
                            inputId={selectId}
                            options={replacementOptions}
                            value={replacementId}
                            onChange={onReplacementChange}
                            isLoading={isLoadingOptions}
                        />
                    </div>
                </div>
            )}

            {action === 'remove' && (
                <p className="mt-2 text-xs text-ink-muted sm:pl-[108px]">No trabajará en esta tarea.</p>
            )}
        </article>
    )
}
