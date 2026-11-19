import { BulkUploadModal } from "@/features/shared/shared";
import { countActivePositions, invalidatePositionQueries, ModalCreatePosition, ModalEditPosition, ModalShowPosition, positionBulkUploadColumns, positionProvider, PositionsEmptyState, PositionsHeader, PositionsTable, useDeletePosition, usePositionModals, usePositionsByLine } from "@/features/positions/positions";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { Line } from "@/features/lines/lines";

type Props = {
    lineId: Line['id'];
    lineCode: Line['code'];
}

export function PositionsByLine({ lineId, lineCode }: Props) {
    const queryClient = useQueryClient();
    const [create, setCreate] = useState(false);
    const [bulkUpload, setBulkUpload] = useState(false);

    const { showId, editId, openShow, openEdit, close } = usePositionModals();
    const { data, isLoading, isError, error } = usePositionsByLine(lineCode);
    const { handleDeletePosition, isDeleting } = useDeletePosition({ lineCode, onSuccess: close });

    const positions = data?.data ?? [];

    return (
        <section className="overflow-hidden rounded-2xl border border-line bg-surface">
            <PositionsHeader
                count={positions.length}
                active={countActivePositions(positions)}
                onAdd={() => setCreate(true)}
                onBulkUpload={() => setBulkUpload(true)}
            />

            {isLoading && (
                <div className="space-y-px">
                    {[0, 1, 2].map(index => (
                        <div key={index} className="flex animate-pulse gap-6 px-5 py-4 motion-reduce:animate-none">
                            <span className="h-2.5 w-16 rounded-full bg-canvas" />
                            <span className="h-2.5 flex-1 rounded-full bg-canvas" />
                        </div>
                    ))}
                </div>
            )}

            {isError && <p className="px-5 py-10 text-center text-sm text-ink-muted">{error.message}</p>}

            {data && positions.length === 0 && (
                <div className="p-5">
                    <PositionsEmptyState onAdd={() => setCreate(true)} />
                </div>
            )}

            {positions.length > 0 && (
                <PositionsTable positions={positions} onShow={openShow} onEdit={openEdit} onRemove={handleDeletePosition} />
            )}

            <ModalCreatePosition open={create} close={() => setCreate(false)} lineId={lineId} lineCode={lineCode} />

            <ModalShowPosition id={showId} close={close} onEdit={openEdit} onRemove={handleDeletePosition} busy={isDeleting} />

            <ModalEditPosition id={editId} close={close} lineId={lineId} lineCode={lineCode} />

            <BulkUploadModal
                modal={bulkUpload}
                closeModal={() => setBulkUpload(false)}
                title="Carga masiva de posiciones"
                templateName="posiciones"
                columns={positionBulkUploadColumns}
                upload={(file) => positionProvider.uploadFile(file)}
                onSuccess={() => invalidatePositionQueries(queryClient, lineCode)}
                note={`Usa el código ${lineCode} en la columna Línea. Las actividades deben estar asignadas a la línea antes de cargar las posiciones.`}
            />
        </section>
    )
}
