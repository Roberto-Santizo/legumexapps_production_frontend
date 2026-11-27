import { CustomFilledButton } from "@/features/shared/shared";
import { UserCogIcon } from "lucide-react";

type Props = {
    onAdd: () => void;
}

export function PositionsEmptyState({ onAdd }: Props) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line-strong bg-surface px-5 py-10 text-center">
            <UserCogIcon className="size-6 text-ink-subtle" />
            <div>
                <p className="text-sm font-medium text-ink">SKU sin posiciones registradas</p>
                <p className="mt-1 text-sm text-ink-muted">Crea los puestos que requiere este SKU y asigna a cada uno una de sus actividades.</p>
            </div>
            <CustomFilledButton label="Crear posición" type="button" onClick={onAdd} />
        </div>
    )
}
