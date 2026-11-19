import { PositionTableRow, type Position } from "@/features/positions/positions";

type Props = {
    positions: Position[];
    onShow: (id: Position['id']) => void;
    onEdit: (id: Position['id']) => void;
    onRemove: (position: Position) => void;
}

const headCell = "sticky top-0 z-[1] border-b border-line bg-canvas px-5 py-2.5 text-left text-xs font-semibold text-ink-muted";

export function PositionsTable({ positions, onShow, onEdit, onRemove }: Props) {
    return (
        <div className="max-h-[480px] overflow-y-auto overscroll-contain">
            <table className="w-full border-separate border-spacing-0 text-sm [&_tbody_tr:last-child_td]:border-b-0">
                <thead>
                    <tr>
                        <th scope="col" className={headCell}>Código</th>
                        <th scope="col" className={headCell}>Actividad</th>
                        <th scope="col" className={headCell}>Unidad</th>
                        <th scope="col" className={headCell}>Estado</th>
                        <th scope="col" className={headCell}><span className="sr-only">Acciones</span></th>
                    </tr>
                </thead>
                <tbody>
                    {positions.map(position => (
                        <PositionTableRow
                            key={position.id}
                            position={position}
                            onShow={() => onShow(position.id)}
                            onEdit={() => onEdit(position.id)}
                            onRemove={() => onRemove(position)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
