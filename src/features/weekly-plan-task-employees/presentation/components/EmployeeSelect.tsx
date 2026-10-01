import Select, { type ClassNamesConfig } from "react-select";
import type { EmployeeOption } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    options: EmployeeOption[];
    value?: number;
    onChange: (employeeId?: number) => void;
    placeholder?: string;
    isLoading?: boolean;
    isClearable?: boolean;
    inputId?: string;
    ariaLabel?: string;
}

const CLASS_NAMES: ClassNamesConfig<EmployeeOption, false> = {
    control: ({ isFocused }) => `min-h-10 rounded-lg border bg-surface px-3 text-sm shadow-sm transition-colors ${isFocused ? 'border-ink ring-2 ring-ink/10' : 'border-line hover:border-line-strong'}`,
    placeholder: () => 'text-ink-subtle',
    singleValue: () => 'text-ink',
    input: () => 'text-ink',
    valueContainer: () => 'gap-1 py-1',
    indicatorsContainer: () => 'gap-1 text-ink-subtle',
    clearIndicator: () => 'p-1 rounded hover:text-ink',
    dropdownIndicator: () => 'p-1 rounded hover:text-ink',
    indicatorSeparator: () => 'my-2 w-px bg-line',
    menu: () => 'mt-1.5 overflow-hidden rounded-lg border border-line bg-surface shadow-lg',
    menuList: () => 'max-h-64 py-1',
    option: ({ isFocused, isSelected }) => `cursor-pointer px-3 py-2 text-sm ${isFocused ? 'bg-canvas' : ''} ${isSelected ? 'text-ink' : 'text-ink-muted'}`,
    noOptionsMessage: () => 'px-3 py-3 text-sm text-ink-subtle',
    loadingMessage: () => 'px-3 py-3 text-sm text-ink-subtle',
};

function EmployeeOptionLabel({ option }: { option: EmployeeOption }) {
    return (
        <span className="flex min-w-0 items-baseline gap-2">
            <span className="truncate text-ink">{option.name}</span>
            <span className="shrink-0 font-mono text-[11px] text-ink-subtle">{option.code} · {option.position}</span>
        </span>
    )
}

export function EmployeeSelect({ options, value, onChange, placeholder = 'Buscar por nombre, código o posición', isLoading = false, isClearable = true, inputId, ariaLabel }: Props) {
    const selected = options.find((option) => option.value === value) ?? null;

    return (
        <Select<EmployeeOption, false>
            unstyled
            inputId={inputId}
            aria-label={ariaLabel}
            options={options}
            value={selected}
            onChange={(option) => onChange(option?.value)}
            formatOptionLabel={(option) => <EmployeeOptionLabel option={option} />}
            classNames={CLASS_NAMES}
            placeholder={placeholder}
            isLoading={isLoading}
            isClearable={isClearable}
            isSearchable
            noOptionsMessage={() => 'Sin empleados disponibles'}
            loadingMessage={() => 'Cargando empleados'}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 60 }) }}
        />
    )
}
