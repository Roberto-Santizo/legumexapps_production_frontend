import { EmployeeSelect, type StationAddConfig } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = StationAddConfig & {
    activityId: number;
    activity: string;
}

export function StationAddEmployee({ options, isLoading, onAdd, activityId, activity }: Props) {
    return (
        <div className="border-b border-line bg-canvas/40 px-2.5 py-2">
            <EmployeeSelect
                ariaLabel={`Agregar alta sin reemplazo en ${activity}`}
                placeholder="+ Agregar alta aquí"
                options={options}
                value={undefined}
                onChange={(employeeId) => employeeId && onAdd(employeeId, activityId)}
                isLoading={isLoading}
                isClearable={false}
            />
        </div>
    )
}
