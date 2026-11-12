import { CustomFilledButton } from "@/features/shared/shared";
import { peopleLabel } from "@/features/line-activities/line-activities";
import { PlusIcon, UsersIcon } from "lucide-react";

type Props = {
    total: number;
    count: number;
    onAdd: () => void;
}

export function LineActivitiesHeader({ total, count, onAdd }: Props) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">
            <div className="flex items-center gap-4">
                <UsersIcon className="size-4 text-ink-subtle" />
                <div>
                    <h3 className="text-sm font-semibold text-ink">Dotación de personal</h3>
                    <p className="mt-0.5 text-xs text-ink-muted">
                        {count > 0
                            ? `${peopleLabel(total)} en ${count} ${count === 1 ? 'actividad' : 'actividades'} · máximo por actividad al asignar personal`
                            : 'Cuántas personas de cada actividad necesita la línea'}
                    </p>
                </div>
            </div>

            {count > 0 && (
                <CustomFilledButton label="Asignar actividad" type="button" icon={<PlusIcon className="size-4" />} onClick={onAdd} />
            )}
        </div>
    )
}
