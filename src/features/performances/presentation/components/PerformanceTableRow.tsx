import { ActionsMenu, StatusTag, Td, Tr } from "@/features/shared/shared";
import { formatAcceptedPercentage, paymentMethodLabel, PerformanceStaffingCell, type Performance } from "@/features/performances/performances";
import { EditIcon, SlidersHorizontalIcon, TrashIcon } from "lucide-react";

type Props = {
    performance: Performance;
    hideLine?: boolean;
    onShow: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onToggleStatus: () => void;
}

export function PerformanceTableRow({ performance, hideLine = false, onShow, onEdit, onDelete, onToggleStatus }: Props) {
    return (
        <Tr>
            <Td>
                <button type="button" onClick={onShow} className="cursor-pointer rounded-md font-mono text-ink hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                    {performance.sku}
                </button>
            </Td>
            {!hideLine && <Td>{performance.line}</Td>}
            <Td className="font-mono tabular-nums">{performance.lbs_performance}</Td>
            <Td className="font-mono tabular-nums">{formatAcceptedPercentage(performance.accepted_percentage)}</Td>
            <Td>{paymentMethodLabel(performance.payment_method)}</Td>
            <Td><PerformanceStaffingCell performance={performance} /></Td>
            <Td><StatusTag onClick={onToggleStatus} flag={performance.status} /></Td>
            <Td className="flex gap-3">
                <ActionsMenu
                    items={[
                        { label: "Configurar", icon: <SlidersHorizontalIcon />, onClick: onShow },
                        { label: "Editar", icon: <EditIcon />, onClick: onEdit },
                        { label: "Eliminar", icon: <TrashIcon />, onClick: onDelete, danger: true },
                    ]}
                />
            </Td>
        </Tr>
    )
}
