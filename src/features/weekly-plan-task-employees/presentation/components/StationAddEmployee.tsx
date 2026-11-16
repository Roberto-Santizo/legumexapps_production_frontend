import { EmployeeSelect, type EmployeeOption } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    options: EmployeeOption[];
    isLoading: boolean;
    onAdd: (employeeId: string) => void;
}

export function PoolAddEmployee({ options, isLoading, onAdd }: Props) {
    return (
        <div className="border-b border-line px-2.5 py-2.5">
            <EmployeeSelect
                ariaLabel="Agregar alta sin reemplazo"
                placeholder="Agregar alta sin reemplazo"
                options={options}
                value={undefined}
                onChange={(employeeId) => employeeId && onAdd(employeeId)}
                isLoading={isLoading}
                isClearable={false}
            />
        </div>
    )
}
