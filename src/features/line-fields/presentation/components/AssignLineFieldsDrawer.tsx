import { Drawer } from "@/features/shared/shared";
import { captureFieldsProvider, captureTypeLabels, type CaptureType } from "@/features/capture-fields/capture-fields";
import { AvailableCaptureFieldItem, availableCaptureFields, groupAvailableFields, missingDependencyLabels, useAssignLineField, type LineField } from "@/features/line-fields/line-fields";
import { useQuery } from "@tanstack/react-query";

type Props = {
    open: boolean;
    close: () => void;
    lineCode: string;
    captureType: CaptureType;
    assigned: LineField[];
}

export function AssignLineFieldsDrawer({ open, close, lineCode, captureType, assigned }: Props) {
    const { assignField, isAssigning, assigningId } = useAssignLineField(lineCode);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getCaptureFields', 'catalog', captureType],
        queryFn: () => captureFieldsProvider.getCaptureFields('', '', { captureType }),
        enabled: open,
        retry: false
    });

    const catalog = data?.data ?? [];
    const groups = groupAvailableFields(availableCaptureFields(catalog, assigned));

    return (
        <Drawer drawer={open} closeDrawer={close} title="Agregar campos" width="sm:max-w-lg">
            <p className="text-sm text-ink-muted">
                Campos de la familia <span className="font-medium text-ink">{captureTypeLabels[captureType]}</span> y globales. Se agregan al final del formulario.
            </p>

            {isLoading && (
                <div className="mt-6 space-y-3">
                    {[0, 1, 2, 3].map(index => (
                        <div key={index} className="h-12 animate-pulse rounded-lg bg-canvas motion-reduce:animate-none" />
                    ))}
                </div>
            )}

            {isError && <p className="mt-6 text-sm text-red-500">{error.message}</p>}

            {data && groups.length === 0 && (
                <p className="mt-6 rounded-xl border border-dashed border-line-strong px-5 py-8 text-center text-sm text-ink-muted">
                    La línea ya tiene todos los campos disponibles.
                </p>
            )}

            <div className="mt-4 space-y-6">
                {groups.map(group => (
                    <section key={group.title}>
                        <div className="border-b border-line pb-2">
                            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-subtle">{group.title}</h3>
                            <p className="mt-0.5 text-xs text-ink-muted">{group.description}</p>
                        </div>

                        <ul className="divide-y divide-line">
                            {group.fields.map(field => (
                                <AvailableCaptureFieldItem
                                    key={field.id}
                                    field={field}
                                    missing={missingDependencyLabels(field, assigned, catalog)}
                                    disabled={isAssigning}
                                    loading={assigningId === field.id}
                                    onAssign={() => assignField(field, assigned)}
                                />
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </Drawer>
    )
}
