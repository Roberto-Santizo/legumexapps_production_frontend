import { CustomFilledButton } from "@/features/shared/shared";
import { PackagePlusIcon } from "lucide-react";

type Props = {
    onAdd: () => void;
}

export function LinePerformancesEmptyState({ onAdd }: Props) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line-strong bg-surface px-5 py-10 text-center">
            <PackagePlusIcon className="size-6 text-ink-subtle" />
            <div>
                <p className="text-sm font-medium text-ink">La línea no tiene SKUs configurados</p>
                <p className="mt-1 text-sm text-ink-muted">Agrega un SKU con su rendimiento para definir sus actividades y posiciones.</p>
            </div>
            <CustomFilledButton label="Agregar SKU" type="button" onClick={onAdd} />
        </div>
    )
}
