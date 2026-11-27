import { Table, Tbody, Th, Thead } from "@/features/shared/shared";
import { PerformanceTableRow, type Performance } from "@/features/performances/performances";

type Props = {
    performances: Performance[];
    hideLine?: boolean;
    onShow: (performance: Performance) => void;
    onEdit: (performance: Performance) => void;
    onDelete: (performance: Performance) => void;
    onToggleStatus: (performance: Performance) => void;
}

export function PerformancesTable({ performances, hideLine = false, onShow, onEdit, onDelete, onToggleStatus }: Props) {
    return (
        <Table>
            <Thead>
                <Th text="SKU" />
                {!hideLine && <Th text="Línea" />}
                <Th text="Libras de Rendimiento" />
                <Th text="Porcentaje Aceptado" />
                <Th text="Método de Pago" />
                <Th text="Posiciones / Cupo" />
                <Th text="Estado" />
                <Th text="Acciones" />
            </Thead>

            <Tbody>
                {performances.map(performance => (
                    <PerformanceTableRow
                        key={performance.id}
                        performance={performance}
                        hideLine={hideLine}
                        onShow={() => onShow(performance)}
                        onEdit={() => onEdit(performance)}
                        onDelete={() => onDelete(performance)}
                        onToggleStatus={() => onToggleStatus(performance)}
                    />
                ))}
            </Tbody>
        </Table>
    )
}
