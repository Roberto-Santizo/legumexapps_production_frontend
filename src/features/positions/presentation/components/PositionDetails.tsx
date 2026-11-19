import { InformationField, StatusTag } from "@/features/shared/shared";
import { getPositionActivityLabel, type Position } from "@/features/positions/positions";

type Props = {
    position: Position;
}

export function PositionDetails({ position }: Props) {
    return (
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
            <div className="flex items-end justify-between gap-4 border-b border-line p-5">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">Código</p>
                    <p className="mt-2 break-all font-mono text-4xl tracking-tight text-ink">{position.code}</p>
                </div>

                <StatusTag flag={position.status} />
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 p-5">
                <div className="col-span-2">
                    <InformationField label="Actividad" value={getPositionActivityLabel(position)} />
                </div>
                <InformationField label="Unidad" value={position.unit ?? '—'} mono />
                <InformationField label="Línea" value={position.line} mono />
            </div>
        </div>
    )
}
