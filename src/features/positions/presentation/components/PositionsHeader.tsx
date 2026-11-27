import { CustomFilledButton } from "@/features/shared/shared";
import { PositionOutlineButton, positionsSummaryLabel } from "@/features/positions/positions";
import { PlusIcon, UploadIcon, UserCogIcon } from "lucide-react";

type Props = {
    count: number;
    active: number;
    onAdd: () => void;
    onBulkUpload: () => void;
}

export function PositionsHeader({ count, active, onAdd, onBulkUpload }: Props) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">
            <div className="flex items-center gap-4">
                <UserCogIcon className="size-4 text-ink-subtle" />
                <div>
                    <h3 className="text-sm font-semibold text-ink">Posiciones</h3>
                    <p className="mt-0.5 text-xs text-ink-muted">
                        {count > 0 ? positionsSummaryLabel(count, active) : 'Puestos del SKU y la actividad que cubre cada uno'}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <PositionOutlineButton label="Carga masiva" icon={<UploadIcon />} onClick={onBulkUpload} />
                {count > 0 && (
                    <CustomFilledButton label="Crear posición" type="button" icon={<PlusIcon className="size-4" />} onClick={onAdd} />
                )}
            </div>
        </div>
    )
}
