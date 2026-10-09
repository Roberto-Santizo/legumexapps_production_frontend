import { isNumericRecordColumn, type PerformanceRecordColumn } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { SigmaIcon } from "lucide-react";

type Props = {
    columns: PerformanceRecordColumn[];
    editable: boolean;
}

export function PerformanceRecordsTableHead({ columns, editable }: Props) {
    return (
        <thead className="thead">
            <tr>
                {columns.map(column => (
                    <th
                        key={column.key}
                        className={`whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-subtle ${isNumericRecordColumn(column) ? 'text-right' : 'text-left'}`}
                    >
                        <span className={`inline-flex items-center gap-1 ${isNumericRecordColumn(column) ? 'flex-row-reverse' : ''}`}>
                            {column.label}
                            {column.is_calculated && <SigmaIcon className="size-3 text-ink-subtle" aria-label="Calculado" />}
                        </span>
                    </th>
                ))}
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-subtle">Registró</th>
                {editable && <th className="px-3 py-3"><span className="sr-only">Acciones</span></th>}
            </tr>
        </thead>
    )
}
