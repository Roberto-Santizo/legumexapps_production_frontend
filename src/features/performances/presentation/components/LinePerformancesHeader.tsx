import { CustomFilledButton } from "@/features/shared/shared";
import { configurationsCountLabel } from "@/features/performances/performances";
import { PlusIcon, SlidersHorizontalIcon } from "lucide-react";

type Props = {
    count: number;
    onAdd: () => void;
}

export function LinePerformancesHeader({ count, onAdd }: Props) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <SlidersHorizontalIcon className="size-4 text-ink-subtle" />
                <div>
                    <h3 className="text-sm font-semibold text-ink">Configuraciones</h3>
                    <p className="mt-0.5 text-xs text-ink-muted">
                        {count > 0
                            ? `${configurationsCountLabel(count)} · abre uno para definir sus actividades y posiciones`
                            : 'SKUs que produce la línea, con su rendimiento y dotación de personal'}
                    </p>
                </div>
            </div>

            {count > 0 && (
                <CustomFilledButton label="Agregar SKU" type="button" icon={<PlusIcon className="size-4" />} onClick={onAdd} />
            )}
        </div>
    )
}
