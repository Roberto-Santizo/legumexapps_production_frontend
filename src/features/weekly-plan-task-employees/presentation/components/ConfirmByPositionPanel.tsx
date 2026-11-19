import { useQuery } from "@tanstack/react-query";
import { AlertTriangleIcon, Loader2Icon, ZapIcon } from "lucide-react";
import { useNotification } from "@/features/shared/shared";
import { buildConfirmByPositionBody, formatEmployeeCount, getConfirmByPositionBlockReason, getConfirmByPositionQuestion, taskAvailableEmployeesQueryKey, TaskEmployeeErrorList, useConfirmTaskEmployeesByPosition, weeklyPlanTaskEmployeeProvider } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    taskId: string;
}

export function ConfirmByPositionPanel({ taskId }: Props) {
    const notification = useNotification();
    const { confirm, isPending, errors } = useConfirmTaskEmployeesByPosition(taskId);

    const { data: candidates = [], isLoading } = useQuery({
        queryKey: taskAvailableEmployeesQueryKey(taskId),
        queryFn: () => weeklyPlanTaskEmployeeProvider.getAvailableEmployeesByTaskId(taskId),
        retry: false
    });

    const blockReason = getConfirmByPositionBlockReason(candidates.length, isLoading);

    const handleConfirm = () => {
        const { title, description } = getConfirmByPositionQuestion(candidates.length);
        notification.question(title, 'Sí, confirmar todos', description, () => confirm(buildConfirmByPositionBody(candidates)));
    };

    return (
        <section aria-labelledby="confirm-by-position-title" className="space-y-3">
            <div className="flex flex-col gap-4 rounded-xl border border-amber-200 bg-surface p-4 sm:flex-row sm:items-center sm:gap-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-200">
                    <AlertTriangleIcon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1 space-y-1">
                    <h3 id="confirm-by-position-title" className="text-sm font-semibold text-ink">Confirmar candidatos por posición</h3>
                    <p className="max-w-2xl text-sm text-ink-muted">
                        Asigna de una vez a {isLoading ? 'los candidatos' : `los ${formatEmployeeCount(candidates.length)}`} de la línea, cada uno a la actividad de su posición, y pasa la tarea a lista para ejecución. Ignora los cambios hechos en el tablero. <span className="font-medium text-amber-800">No se puede deshacer.</span>
                    </p>
                    {blockReason && !isLoading && (
                        <p role="status" className="text-xs font-medium text-amber-800">{blockReason}</p>
                    )}
                </div>
                <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={isPending || blockReason !== null}
                    className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:bg-ink/40"
                >
                    {isPending
                        ? <Loader2Icon className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                        : <ZapIcon className="size-4" aria-hidden="true" />}
                    Confirmar por posición
                </button>
            </div>

            <TaskEmployeeErrorList title="No se pudo confirmar el personal por posición" errors={errors} />
        </section>
    )
}
