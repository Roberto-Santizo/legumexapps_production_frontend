import { ActionsMenu, Td, Tr, type ActionMenuItem } from "@/features/shared/shared";
import { CaptureFieldTags, canDeleteCaptureField, canEditCaptureField, type CaptureField } from "@/features/capture-fields/capture-fields";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";

type Props = {
    field: CaptureField;
    onShow: (field: CaptureField) => void;
    onEdit: (field: CaptureField) => void;
    onDelete: (field: CaptureField) => void;
}

export function CaptureFieldRow({ field, onShow, onEdit, onDelete }: Props) {
    const items: ActionMenuItem[] = [
        { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => onShow(field) },
        ...(canEditCaptureField(field) ? [{ label: "Editar", icon: <EditIcon />, onClick: () => onEdit(field) }] : []),
        ...(canDeleteCaptureField(field) ? [{ label: "Eliminar", icon: <Trash2Icon />, onClick: () => onDelete(field), danger: true }] : []),
    ];

    return (
        <Tr>
            <Td>
                <p className="text-sm font-medium text-ink">{field.label}</p>
                <p className="mt-0.5 font-mono text-xs text-ink-subtle">{field.key}</p>
            </Td>
            <Td>
                <CaptureFieldTags field={field} showScope />
            </Td>
            <Td>
                {field.is_calculated
                    ? <span className="font-mono text-xs text-ink-muted">{field.depends_on.join(' · ')}</span>
                    : <span className="text-ink-subtle">—</span>}
            </Td>
            <Td>
                <span className={`whitespace-nowrap text-sm ${field.is_assigned ? 'text-ink' : 'text-ink-subtle'}`}>
                    {field.is_assigned ? 'En uso' : 'Sin asignar'}
                </span>
            </Td>
            <Td>
                <ActionsMenu items={items} />
            </Td>
        </Tr>
    )
}
