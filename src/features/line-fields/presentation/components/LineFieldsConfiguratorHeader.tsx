import { CustomFilledButton } from "@/features/shared/shared";
import { captureTypeLabels, type CaptureType } from "@/features/capture-fields/capture-fields";
import { EyeIcon, ListChecksIcon, PlusIcon } from "lucide-react";

type Props = {
    captureType: CaptureType;
    count: number;
    onPreview: () => void;
    onAdd: () => void;
}

export function LineFieldsConfiguratorHeader({ captureType, count, onPreview, onAdd }: Props) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">
            <div className="flex items-center gap-4">
                <ListChecksIcon className="size-4 text-ink-subtle" />
                <div>
                    <h3 className="text-sm font-semibold text-ink">Formulario de captura</h3>
                    <p className="mt-0.5 text-xs text-ink-muted">
                        Familia {captureTypeLabels[captureType]} · {count} {count === 1 ? 'campo' : 'campos'} en el orden en que se capturan
                    </p>
                </div>
            </div>

            {count > 0 && (
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onPreview}
                        className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-surface px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                        <EyeIcon className="size-4" />
                        Vista previa
                    </button>
                    <CustomFilledButton label="Agregar campos" type="button" icon={<PlusIcon className="size-4" />} onClick={onAdd} />
                </div>
            )}
        </div>
    )
}
