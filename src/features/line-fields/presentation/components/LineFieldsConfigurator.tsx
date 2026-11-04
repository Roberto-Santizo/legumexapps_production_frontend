import { handleSetQueryParam } from "@/features/shared/shared";
import type { CaptureType } from "@/features/capture-fields/capture-fields";
import { AssignLineFieldsDrawer, blockingCalculated, LineFieldRow, LineFieldsConfiguratorHeader, LineFieldsEmptyState, lineFieldsProvider, lineFieldsQueryKey, ModalEditLineField, ModalLineCapturePreview, useRemoveLineField, useReorderLineFields, useUpdateLineField } from "@/features/line-fields/line-fields";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
    lineCode: string;
    captureType: CaptureType;
}

export function LineFieldsConfigurator({ lineCode, captureType }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [drawer, setDrawer] = useState(false);
    const [preview, setPreview] = useState(false);
    const { moveField, isReordering } = useReorderLineFields(lineCode);
    const { handleRemoveField, isRemoving } = useRemoveLineField(lineCode);
    const { updateField, isUpdating } = useUpdateLineField({ lineCode });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: lineFieldsQueryKey(lineCode),
        queryFn: () => lineFieldsProvider.getLineFields(lineCode),
        retry: false
    });

    const busy = isReordering || isRemoving || isUpdating;
    const fields = data ?? [];

    return (
        <section className="overflow-hidden rounded-2xl border border-line bg-surface">
            <LineFieldsConfiguratorHeader
                captureType={captureType}
                count={fields.length}
                onPreview={() => setPreview(true)}
                onAdd={() => setDrawer(true)}
            />

            {isLoading && (
                <div className="space-y-px">
                    {[0, 1, 2].map(index => (
                        <div key={index} className="flex animate-pulse gap-6 px-5 py-4 motion-reduce:animate-none">
                            <span className="h-2.5 w-6 rounded-full bg-canvas" />
                            <span className="h-2.5 flex-1 rounded-full bg-canvas" />
                        </div>
                    ))}
                </div>
            )}

            {isError && <p className="px-5 py-10 text-center text-sm text-ink-muted">{error.message}</p>}

            {data && fields.length === 0 && (
                <div className="p-5">
                    <LineFieldsEmptyState onAdd={() => setDrawer(true)} />
                </div>
            )}

            {fields.length > 0 && (
                <ol className="divide-y divide-line">
                    {fields.map((field, index) => (
                        <LineFieldRow
                            key={field.id}
                            field={field}
                            position={index + 1}
                            isFirst={index === 0}
                            isLast={index === fields.length - 1}
                            blockers={blockingCalculated(field, fields)}
                            busy={busy}
                            onMoveUp={() => moveField(fields, index, index - 1)}
                            onMoveDown={() => moveField(fields, index, index + 1)}
                            onToggleRequired={(required) => updateField(field.id, { is_required: required })}
                            onEdit={() => handleSetQueryParam(location, navigate, 'editLineField', `${field.id}`)}
                            onRemove={() => handleRemoveField(field)}
                        />
                    ))}
                </ol>
            )}

            <AssignLineFieldsDrawer
                open={drawer}
                close={() => setDrawer(false)}
                lineCode={lineCode}
                captureType={captureType}
                assigned={fields}
            />

            <ModalEditLineField lineCode={lineCode} fields={fields} />

            <ModalLineCapturePreview open={preview} close={() => setPreview(false)} fields={fields} />
        </section>
    )
}
