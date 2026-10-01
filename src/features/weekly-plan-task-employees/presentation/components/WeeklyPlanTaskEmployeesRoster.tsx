import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserPlusIcon } from "lucide-react";
import { CustomFilledButton, handleSetQueryParam, useNotification } from "@/features/shared/shared";
import { StaffListEmpty, StaffListError, StaffListLoading, WeeklyPlanTaskEmployeeRow, weeklyPlanTaskEmployeeProvider, type WeeklyPlanTaskEmployee } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    taskId: string;
    editable: boolean;
}

export function WeeklyPlanTaskEmployeesRoster({ taskId, editable }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getWeeklyPlanTaskEmployees', taskId],
        queryFn: () => weeklyPlanTaskEmployeeProvider.getEmployeesByTaskId(taskId),
        retry: false
    });

    const refreshEmployees = () => queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTaskEmployees', taskId] });

    const { mutate } = useMutation({
        mutationFn: (id: string) => weeklyPlanTaskEmployeeProvider.deleteWeeklyPlanTaskEmployeeById(id),
        onSuccess: (message) => {
            notification.success(message);
            refreshEmployees();
        },
        onError: (err) => {
            notification.error(err.message);
            refreshEmployees();
        }
    });

    const handleRemove = (assignment: WeeklyPlanTaskEmployee) => notification.question(
        `¿Desea quitar a ${assignment.name} de la tarea?`,
        'Quitar',
        'La asignación pasa al historial de la tarea',
        () => mutate(`${assignment.id}`)
    );

    const employees = data ?? [];

    return (
        <section className="space-y-3">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                    <h3 className="text-sm font-semibold text-ink">Personal asignado</h3>
                    {data && <span className="font-mono text-xs text-ink-subtle">{employees.length} empleados</span>}
                </div>

                {editable && (
                    <CustomFilledButton
                        type="button"
                        label="Agregar empleado"
                        icon={<UserPlusIcon className="size-4" />}
                        onClick={() => handleSetQueryParam(location, navigate, 'addTaskEmployee', taskId)}
                    />
                )}
            </div>

            <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
                {isLoading && <StaffListLoading />}

                {isError && <StaffListError message={error.message} />}

                {data && employees.length === 0 && (
                    <StaffListEmpty
                        title="Sin personal asignado"
                        description="El personal aparecerá aquí cuando se confirme la asignación de la tarea."
                    />
                )}

                {employees.map((assignment) => (
                    <WeeklyPlanTaskEmployeeRow
                        key={assignment.id}
                        assignment={assignment}
                        editable={editable}
                        canRemove={employees.length > 1}
                        onReplace={() => handleSetQueryParam(location, navigate, 'replaceTaskEmployee', `${assignment.id}`)}
                        onRemove={() => handleRemove(assignment)}
                    />
                ))}
            </div>
        </section>
    )
}
