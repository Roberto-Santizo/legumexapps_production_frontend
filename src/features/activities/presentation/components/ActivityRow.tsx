import { ActionsMenu, Td, Tr, type ActionMenuItem } from "@/features/shared/shared";
import type { Activity } from "@/features/activities/activities";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";

type Props = {
    activity: Activity;
    onShow: (activity: Activity) => void;
    onEdit: (activity: Activity) => void;
    onDelete: (activity: Activity) => void;
}

export function ActivityRow({ activity, onShow, onEdit, onDelete }: Props) {
    const items: ActionMenuItem[] = [
        { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => onShow(activity) },
        { label: "Editar", icon: <EditIcon />, onClick: () => onEdit(activity) },
        { label: "Eliminar", icon: <Trash2Icon />, onClick: () => onDelete(activity), danger: true },
    ];

    return (
        <Tr>
            <Td>
                <p className="text-sm font-medium tracking-wide text-ink">{activity.name}</p>
            </Td>
            <Td>
                <span className="font-mono text-xs text-ink-muted">{activity.unit}</span>
            </Td>
            <Td>
                <ActionsMenu items={items} />
            </Td>
        </Tr>
    )
}
