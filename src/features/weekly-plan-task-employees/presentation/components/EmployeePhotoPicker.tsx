import { useState } from "react";
import { Search } from "lucide-react";
import { EmployeePickerEmpty, EmployeePickerRow, filterEmployeeOptions, findEmployeeOption, StaffListLoading, type EmployeeOption } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    options: EmployeeOption[];
    value?: string;
    onChange: (employeeId?: string) => void;
    onBlur?: () => void;
    isLoading?: boolean;
}

export function EmployeePhotoPicker({ options, value, onChange, onBlur, isLoading = false }: Props) {
    const [term, setTerm] = useState('');
    const visible = filterEmployeeOptions(options, term);
    const selected = findEmployeeOption(options, value);

    return (
        <div className="space-y-3">
            <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
                <input
                    type="search"
                    value={term}
                    onChange={(event) => setTerm(event.target.value)}
                    placeholder="Buscar por nombre, código o posición"
                    aria-label="Buscar empleado"
                    className="text_form_field pl-9 text-sm"
                />
            </div>

            <div className="flex items-baseline justify-between gap-3 text-xs">
                <span className="shrink-0 text-ink-subtle">
                    {isLoading ? 'Cargando…' : `${visible.length} de ${options.length} disponibles`}
                </span>
                <span aria-live="polite" className="truncate text-right text-ink-muted">
                    {selected ? <>Seleccionado: <span className="font-medium text-ink">{selected.name}</span></> : 'Ningún empleado seleccionado'}
                </span>
            </div>

            <div role="radiogroup" aria-label="Empleados disponibles" className="max-h-[22rem] divide-y divide-line overflow-y-auto overscroll-contain rounded-xl border border-line bg-surface">
                {isLoading && <StaffListLoading />}

                {!isLoading && visible.length === 0 && <EmployeePickerEmpty term={term} />}

                {!isLoading && visible.map((option) => (
                    <EmployeePickerRow
                        key={option.value}
                        option={option}
                        checked={option.value === value}
                        onSelect={onChange}
                        onBlur={onBlur}
                    />
                ))}
            </div>
        </div>
    )
}
