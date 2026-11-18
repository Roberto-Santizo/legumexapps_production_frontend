import { Collapse } from "@/features/shared/shared";
import { RotateCcwIcon } from "lucide-react";
import type { CandidateRow } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    rows: CandidateRow[];
    onRestore: (candidateId: string) => void;
}

export function RemovedCandidatesList({ rows, onRestore }: Props) {
    return (
        <Collapse show={rows.length > 0}>
            <div className="border-t border-line px-3.5 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Bajas · {rows.length}</p>

                <ul className="mt-2 space-y-1">
                    {rows.map(({ candidate }) => (
                        <li key={candidate.id} className="flex items-center justify-between gap-2">
                            <span className="min-w-0">
                                <span className="block truncate text-xs text-ink-muted line-through decoration-ink-subtle">{candidate.name}</span>
                                <span className="block font-mono text-[10.5px] text-ink-subtle">{candidate.code}</span>
                            </span>

                            <button
                                type="button"
                                onClick={() => onRestore(candidate.id)}
                                className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
                            >
                                <RotateCcwIcon className="size-3" aria-hidden="true" />
                                Restaurar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </Collapse>
    )
}
