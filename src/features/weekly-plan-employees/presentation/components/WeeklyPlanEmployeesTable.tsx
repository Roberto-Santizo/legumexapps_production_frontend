import { ActionsMenu, Table, Tbody, Td, Th, Thead, Tr } from "@/features/shared/shared";
import type { WeeklyPlanEmployee } from "@/features/weekly-plan-employees/weekly-plan-employees";
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react";

type Props = {
    items: WeeklyPlanEmployee[];
    onShow: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export function WeeklyPlanEmployeesTable({ items, onShow, onEdit, onDelete }: Props) {
    return (
        <Table>
            <Thead>
                <Th text="Código" />
                <Th text="Nombre" />
                <Th text="Posición" />
                <Th text="Puesto biométrico" />
                <Th text="Acciones" />
            </Thead>

            <Tbody>
                {items.map(item => (
                    <Tr key={item.id}>
                        <Td className="font-mono tabular-nums">{item.code}</Td>
                        <Td>{item.name}</Td>
                        <Td className="font-mono">{item.position}</Td>
                        <Td>{item.biometric_position ?? '-'}</Td>
                        <Td className="flex gap-3">
                            <ActionsMenu
                                items={[
                                    { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => onShow(item.id) },
                                    { label: "Editar", icon: <EditIcon />, onClick: () => onEdit(item.id) },
                                    { label: "Eliminar", icon: <TrashIcon />, onClick: () => onDelete(item.id), danger: true },
                                ]}
                            />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}
