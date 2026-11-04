import { CustomFilledButton } from "@/features/shared/shared";
import { ListPlusIcon } from "lucide-react";

type Props = {
    onAdd?: () => void;
}

export function LineFieldsEmptyState({ onAdd }: Props) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line-strong bg-surface px-5 py-10 text-center">
            <ListPlusIcon className="size-6 text-ink-subtle" />
            <div>
                <p className="text-sm font-medium text-ink">Línea sin campos configurados</p>
                <p className="mt-1 text-sm text-ink-muted">Agrega los datos que el personal registrará en esta línea.</p>
            </div>
            {onAdd && <CustomFilledButton label="Agregar campos" type="button" onClick={onAdd} />}
        </div>
    )
}
