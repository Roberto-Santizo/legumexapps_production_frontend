import { CustomFilledButton, useNotification } from "@/features/shared/shared";
import { AnimatePresence } from "framer-motion";
import { ClipboardList, MapPinIcon, PackageIcon, PlusIcon, WorkflowIcon, XIcon } from "lucide-react";
import { DraftWeeklyPlanTaskComponent, defaultDraftWeeklyPlanTaskFilters, draftWeeklyPlanTaskProvider, ModalCreateDraftWeeklyPlanTask, ModalUpdateDraftWeeklyPlanTask, useDraftWeeklyPlanTaskFilters, type DraftWeeklyPlanTaskFilters } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";

const filterFields: { name: keyof DraftWeeklyPlanTaskFilters; label: string; placeholder: string; icon: ReactNode }[] = [
    { name: 'line', label: 'Línea', placeholder: 'Buscar línea', icon: <WorkflowIcon className="size-4" /> },
    { name: 'sku', label: 'SKU', placeholder: 'Buscar SKU', icon: <PackageIcon className="size-4" /> },
    { name: 'destination', label: 'Destino', placeholder: 'Buscar destino', icon: <MapPinIcon className="size-4" /> },
];

export function DraftWeeklyPlanTasksSidebar() {
    const { id } = useParams();
    const notification = useNotification();
    const [taskId, setTaskId] = useState('');
    const [createModal, setCreateModal] = useState(false);
    const queryClient = useQueryClient();
    const { filters, setFilters, clearFilters } = useDraftWeeklyPlanTaskFilters();
    const [search, setSearch] = useState<DraftWeeklyPlanTaskFilters>(defaultDraftWeeklyPlanTaskFilters);

    useEffect(() => {
        const timeout = setTimeout(() => setFilters({
            line: search.line.trim(),
            sku: search.sku.trim(),
            destination: search.destination.trim()
        }), 400);

        return () => clearTimeout(timeout);
    }, [search, setFilters]);

    const hasFilters = Object.values(search).some(value => value !== '');

    const handleClearFilters = () => {
        setSearch(defaultDraftWeeklyPlanTaskFilters);
        clearFilters();
    }

    const { data, isLoading, isFetching, refetch } = useQuery({
        queryKey: ['getDraftWeeklyPlanTasksSidebar', id, filters],
        queryFn: () => draftWeeklyPlanTaskProvider.getDraftWeeklyPlanTasks(id!, '', '', filters),
        placeholderData: keepPreviousData
    });

    const refetchPlanData = () => {
        queryClient.invalidateQueries({ queryKey: ['getHoursPerLineByDraftWeeklyPlanId', id] });
        queryClient.invalidateQueries({ queryKey: ['getPackingMaterialNecessityById', id] });
        queryClient.invalidateQueries({ queryKey: ['getRawNecessityById', id] });
        refetch();
    }

    const { mutate } = useMutation({
        mutationFn: (id: string) => draftWeeklyPlanTaskProvider.deleteDraftWeeklyPlanTaskById(id),
        onSuccess: (message) => {
            notification.success(message);
            refetchPlanData();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });


    const handleDeleteTask = (id: string) => notification.question('¿Desea eliminar la tarea?', 'Eliminar', 'La tarea se eliminará del sistema', () => mutate(id));

    const closeUpdateModal = () => setTaskId('');

    return (
        <aside className="flex w-full h-dvh hrink-0 flex-col space-y-3 lg:w-80 shadow-xl p-5">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-ink">Tareas</h3>
                <CustomFilledButton
                    label="Crear"
                    type="button"
                    icon={<PlusIcon />}
                    onClick={() => setCreateModal(true)}
                />
            </div>

            <div className="space-y-2 border-b border-line pb-3">
                {filterFields.map(field => (
                    <label key={field.name} className="relative block">
                        <span className="sr-only">{field.label}</span>
                        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink-subtle">{field.icon}</span>
                        <input
                            type="search"
                            value={search[field.name]}
                            onChange={e => setSearch(prev => ({ ...prev, [field.name]: e.target.value }))}
                            placeholder={field.placeholder}
                            className="w-full rounded-lg border border-line bg-canvas py-1.5 pl-9 pr-3 text-sm text-ink transition placeholder:text-ink-subtle focus:border-ink focus:bg-surface focus:outline-none focus:ring-2 focus:ring-ink/10"
                        />
                    </label>
                ))}

                <div className="flex h-5 items-center justify-between text-xs text-ink-subtle">
                    <span className="tabular-nums">
                        {isFetching ? 'Buscando…' : data ? `${data.data.length} ${data.data.length === 1 ? 'tarea' : 'tareas'}` : ''}
                    </span>
                    {hasFilters && (
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className="inline-flex items-center gap-1 rounded text-ink-muted transition hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 cursor-pointer"
                        >
                            <XIcon className="size-3.5" />
                            Limpiar filtros
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-3 overflow-y-auto">
                {isLoading && (
                    <div className="flex h-40 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-ink" />
                    </div>
                )}

                {data && data.data.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface py-10 text-center">
                        <ClipboardList className="size-6 text-ink-subtle" />
                        <p className="text-sm text-ink-muted">{hasFilters ? 'Ninguna tarea coincide con los filtros' : 'No hay tareas registradas para este plan semanal'}</p>
                    </div>
                )}

                <AnimatePresence>
                    {data?.data.map(task => (
                        <DraftWeeklyPlanTaskComponent key={task.id} task={task} deleteTask={handleDeleteTask} setTaskId={setTaskId}/>
                    ))}
                </AnimatePresence>
            </div>

            <ModalCreateDraftWeeklyPlanTask
                modal={createModal}
                closeModal={() => setCreateModal(false)}
                callback={() => refetchPlanData()}
            />

            <ModalUpdateDraftWeeklyPlanTask
                modal={!!taskId}
                closeModal={closeUpdateModal}
                taskId={taskId}
                callback={() => refetchPlanData()}
            />
        </aside>
    )
}
