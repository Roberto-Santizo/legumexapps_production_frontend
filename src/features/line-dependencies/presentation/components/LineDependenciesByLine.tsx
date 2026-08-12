import { CustomFilledButton, useNotification } from "@/features/shared/shared";
import { lineDependenciesRepositoryProvider, ModalCreateDependency } from "@/features/line-dependencies/line-dependencies";
import { TrashIcon, WorkflowIcon } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Line } from "@/features/lines/lines";

type Props = {
    id: Line['id'];
}

export function LineDependenciesByLine({ id }: Props) {
    const notification = useNotification();
    const [modal, setModal] = useState<boolean>(false);

    const { data, refetch } = useQuery({
        queryKey: ['getLineDependencies', id],
        queryFn: () => lineDependenciesRepositoryProvider.getLineDependencies(`${id}`)
    });

    const { mutate } = useMutation({
        mutationFn: (dependancyId: string) => lineDependenciesRepositoryProvider.deleteLineDependencyById(dependancyId),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleOnDelete = (id: string) => notification.question('¿Desea eliminar la dependencia?', 'Eliminar', 'Si elimina la dependencia no se relacionará a la linea base', () => mutate(id));

    if (data) return (
        <div>
            {data.length ? (
                <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                    <div className="border-b border-line px-5 py-4">
                        <div className="flex items-center gap-2 justify-between">
                            <div className="flex gap-5 items-center">

                                <WorkflowIcon className="size-4 text-ink-subtle" />

                                <div>
                                    <h3 className="text-sm font-semibold text-ink">
                                        Líneas relacionadas
                                    </h3>

                                    <p className="mt-0.5 text-xs text-ink-muted">
                                        Líneas que pueden activarse junto con esta línea
                                    </p>


                                </div>
                            </div>
                            <CustomFilledButton
                                label="Agregar Línea Dependiente"
                                type="button"
                                onClick={() => setModal(true)}
                            />
                        </div>
                    </div>

                    <ul className="divide-y divide-line">
                        {data.map((dependency) => (
                            <li
                                key={dependency.id}
                                className="group relative flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-muted"
                            >
                                <div className="relative flex size-9 shrink-0 items-center justify-center">
                                    <button className="cursor-pointer hover:text-gray-400" type="button" onClick={() => handleOnDelete(`${dependency.id}`)}>
                                        <TrashIcon size={20} />
                                    </button>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-ink">
                                        {dependency.line_dependant_name}
                                    </p>

                                    <p className="mt-0.5 text-xs text-ink-muted">
                                        Línea dependiente
                                    </p>
                                </div>

                                <div className="shrink-0 text-right">
                                    <span className="text-[11px] font-medium uppercase tracking-wide text-ink-subtle">
                                        Posiciones
                                    </span>

                                    <div className="mt-1 flex justify-end">
                                        <span className="rounded-lg border border-line bg-surface-muted px-2.5 py-1 font-mono text-xs font-medium text-ink">
                                            {dependency.positions}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-line bg-surface py-10 text-center">
                    <WorkflowIcon className="size-6 text-ink-subtle" />
                    <p className="text-sm text-ink-muted">Esta línea no tiene líneas dependientes registradas</p>
                    <CustomFilledButton
                        label="Agregar Línea Dependiente"
                        type="button"
                        onClick={() => setModal(true)}
                    />
                </div>
            )}

            <ModalCreateDependency modal={modal} closeModal={() => setModal(false)} lineId={id} />
        </div>
    )
}