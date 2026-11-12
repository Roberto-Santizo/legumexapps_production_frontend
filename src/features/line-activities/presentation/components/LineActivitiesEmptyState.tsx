import { CustomFilledButton } from "@/features/shared/shared";
import { UserPlusIcon } from "lucide-react";

type Props = {
    onAdd: () => void;
}

export function LineActivitiesEmptyState({ onAdd }: Props) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line-strong bg-surface px-5 py-10 text-center">
            <UserPlusIcon className="size-6 text-ink-subtle" />
            <div>
                <p className="text-sm font-medium text-ink">Línea sin actividades configuradas</p>
                <p className="mt-1 text-sm text-ink-muted">Asigna las actividades de la línea y cuántas personas necesita cada una.</p>
            </div>
            <CustomFilledButton label="Asignar actividad" type="button" onClick={onAdd} />
        </div>
    )
}
