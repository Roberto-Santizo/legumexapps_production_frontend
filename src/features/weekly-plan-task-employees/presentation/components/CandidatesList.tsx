import { CandidateRowComponent, StaffListEmpty, StaffListError, StaffListLoading, type CandidateAction, type CandidateRow, type EmployeeOption } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    rows: CandidateRow[];
    isLoading: boolean;
    errorMessage?: string;
    isLoadingOptions: boolean;
    getReplacementOptions: (candidateId: number) => EmployeeOption[];
    onActionChange: (candidateId: number, action: CandidateAction) => void;
    onReplacementChange: (candidateId: number, replacementId?: number) => void;
}

export function CandidatesList({ rows, isLoading, errorMessage, isLoadingOptions, getReplacementOptions, onActionChange, onReplacementChange }: Props) {
    return (
        <section className="space-y-3">
            <div className="flex items-baseline justify-between gap-3">
                <div>
                    <h3 className="text-sm font-semibold text-ink">Candidatos de la línea</h3>
                    <p className="mt-0.5 text-xs text-ink-muted">Empleados del plan con posición en la línea de la tarea.</p>
                </div>

                {!isLoading && <span className="font-mono text-xs text-ink-subtle">{rows.length} candidatos</span>}
            </div>

            <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
                {isLoading && <StaffListLoading />}

                {errorMessage && <StaffListError message={errorMessage} />}

                {!isLoading && !errorMessage && rows.length === 0 && (
                    <StaffListEmpty
                        title="Sin candidatos"
                        description="No hay posiciones de esta línea con personal en el plan. Agrega empleados como altas para confirmar."
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
