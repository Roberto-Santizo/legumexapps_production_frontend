import { CaptureFieldTags, type CaptureField } from "@/features/capture-fields/capture-fields";
import { PlusIcon } from "lucide-react";

type Props = {
    field: CaptureField;
    missing: string[];
    disabled: boolean;
    loading: boolean;
    onAssign: () => void;
}

export function AvailableCaptureFieldItem({ field, missing, disabled, loading, onAssign }: Props) {
    const blocked = missing.length > 0;

    return (
        <li className="flex items-start gap-3 py-3">
            <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${blocked ? 'text-ink-muted' : 'text-ink'}`}>{field.label}</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] text-ink-subtle">{field.key}</span>
                    <CaptureFieldTags field={field} />
                </div>
                {blocked && (
                    <p className="mt-1.5 text-xs text-ink-muted">
                        Primero asigna: <span className="font-medium text-ink">{missing.join(', ')}</span>
                    </p>
                )}
            </div>

            <button
                type="button"
                onClick={onAssign}
                disabled={disabled || blocked}
                aria-label={`Agregar ${field.label}`}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-line-strong bg-surface px-2.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-40"
            >
                {loading
                    ? <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" aria-hidden="true" />
                    : <PlusIcon className="size-3.5" />}
                Agregar
            </button>
        </li>
    )
}
