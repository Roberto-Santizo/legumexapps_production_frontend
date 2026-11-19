import { CustomFilledButton, Modal } from "@/features/shared/shared";
import { PositionDetails, PositionOutlineButton, usePositionById, type Position } from "@/features/positions/positions";
import { EditIcon, Trash2Icon } from "lucide-react";

type Props = {
    id: string;
    close: () => void;
    onEdit: (id: number) => void;
    onRemove: (position: Position) => void;
    busy: boolean;
}

export function ModalShowPosition({ id, close, onEdit, onRemove, busy }: Props) {
    const { data, isLoading, isError, error } = usePositionById(id);

    return (
        <Modal modal={id !== ''} closeModal={close} title="Detalle de la posición" width="sm:max-w-lg">
            {isLoading && <div className="h-48 animate-pulse rounded-xl bg-canvas motion-reduce:animate-none" />}

            {isError && <p className="text-sm text-red-500">{error.message}</p>}

            {data && (
                <div className="space-y-5">
                    <PositionDetails position={data} />

                    <div className="flex flex-wrap justify-end gap-2">
                        <PositionOutlineButton label="Eliminar" icon={<Trash2Icon />} onClick={() => onRemove(data)} disabled={busy} danger />
                        <CustomFilledButton label="Editar" type="button" icon={<EditIcon className="size-4" />} onClick={() => onEdit(data.id)} />
                    </div>
                </div>
            )}
        </Modal>
    )
}
