import { CandidateRowComponent, StaffListEmpty, StaffListError, StaffListLoading, type CandidateAction, type CandidateRow, type EmployeeOption } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    rows: CandidateRow[];
    isLoading: boolean;
    errorMessage?: string;
    isLoadingOptions: boolean;
    getReplacementOptions: (candidateId: string) => EmployeeOption[];
    onActionChange: (candidateId: string, action: CandidateAction) => void;
    onReplacementChange: (candidateId: string, replacementId?: string) => void;
}

export function CandidatesList({ rows, isLoading, errorMessage, isLoadingOptions, getReplacementOptions, onActionChange, onReplacementChange }: Props) {
    return (
        <section className="space-y-3">
            <div className="flex items-baseline justify-between gap-3">
                <div>
                    <h3 className="text-sm font-semibold text-ink">Candidatos de la línea</h3>
                    <p className="mt-0.5 text-xs text-ink-muted">Empleados que el biométrico reporta en la línea. Decide quién se queda, quién sale y quién entra en su lugar.</p>
                </div>

                {!isLoading && <span className="font-mono text-xs text-ink-subtle">{rows.length} candidatos</span>}
            </div>

            <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
                {isLoading && <StaffListLoading />}

                {errorMessage && <StaffListError message={errorMessage} />}

                {!isLoading && !errorMessage && rows.length === 0 && (
                    <StaffListEmpty
                        title="Sin candidatos"
                        description="El biométrico no reporta empleados en esta línea. Agrega empleados como altas para confirmar."
                    />
                )}

                {rows.map((row) => (
                    <CandidateRowComponent
                        key={row.candidate.id}
                        row={row}
                        replacementOptions={getReplacementOptions(row.candidate.id)}
                        isLoadingOptions={isLoadingOptions}
                        onActionChange={(action) => onActionChange(row.candidate.id, action)}
                        onReplacementChange={(replacementId) => onReplacementChange(row.candidate.id, replacementId)}
                    />
                ))}
            </div>
        </section>
    )
}
