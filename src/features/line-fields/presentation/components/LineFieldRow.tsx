import { CaptureFieldTags } from "@/features/capture-fields/capture-fields";
import { formatOrderNumber, LineFieldRequiredSwitch, type LineField } from "@/features/line-fields/line-fields";
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, Trash2Icon } from "lucide-react";

type Props = {
    field: LineField;
    position: number;
    isFirst: boolean;
    isLast: boolean;
    blockers: LineField[];
    busy: boolean;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onToggleRequired: (required: boolean) => void;
    onEdit: () => void;
    onRemove: () => void;
}

const iconButton = "rounded-md p-1.5 text-ink-subtle transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-30";

export function LineFieldRow({ field, position, isFirst, isLast, blockers, busy, onMoveUp, onMoveDown, onToggleRequired, onEdit, onRemove }: Props) {
    const removeBlockedMessage = blockers.length
        ? `No se puede quitar ${field.label}: lo usa ${blockers.map(item => item.label).join(', ')}`
        : undefined;

    return (
        <li className={`group flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3.5 transition-colors hover:bg-canvas/60 ${field.is_calculated ? 'bg-canvas/40' : ''}`}>
            <span className="w-6 shrink-0 font-mono text-xs tabular-nums text-ink-subtle">{formatOrderNumber(position)}</span>

            <div className="min-w-0 flex-1 basis-56">
                <div className="flex flex-wrap items-baseline gap-x-2">
                    <p className="truncate text-sm font-medium text-ink">
                        {field.label}
                        {field.is_required && <span className="ml-0.5 text-ink-muted" aria-label="obligatorio">*</span>}
                    </p>
                    {field.custom_label && (
                        <p className="truncate text-xs text-ink-subtle">({field.field_label})</p>
                    )}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] text-ink-subtle">{field.key}</span>
                    <CaptureFieldTags field={field} />
                    {field.is_calculated && field.depends_on.length > 0 && (
                        <span className="font-mono text-[11px] text-ink-muted">= ƒ({field.depends_on.join(', ')})</span>
                    )}
                </div>
            </div>

            <div className="flex w-28 shrink-0 justify-start">
                {field.is_calculated
                    ? <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">Solo lectura</span>
                    : <LineFieldRequiredSwitch
                        checked={field.is_required}
                        disabled={busy}
                        label={`Marcar ${field.label} como obligatorio`}
                        onChange={onToggleRequired}
                    />}
            </div>

            <div className="flex shrink-0 items-center gap-0.5">
                <button type="button" className={iconButton} onClick={onMoveUp} disabled={isFirst || busy} aria-label={`Subir ${field.label}`} title="Subir">
                    <ChevronUpIcon className="size-4" />
                </button>
                <button type="button" className={iconButton} onClick={onMoveDown} disabled={isLast || busy} aria-label={`Bajar ${field.label}`} title="Bajar">
                    <ChevronDownIcon className="size-4" />
                </button>
                <span className="mx-1 h-4 w-px bg-line" aria-hidden="true" />
                <button type="button" className={iconButton} onClick={onEdit} disabled={busy} aria-label={`Editar ${field.label}`} title="Editar etiqueta">
                    <PencilIcon className="size-4" />
                </button>
                <span title={removeBlockedMessage ?? 'Quitar de la línea'}>
                    <button type="button" className={`${iconButton} hover:text-red-600`} onClick={onRemove} disabled={busy || blockers.length > 0} aria-label={removeBlockedMessage ?? `Quitar ${field.label}`}>
                        <Trash2Icon className="size-4" />
                    </button>
                </span>
            </div>
        </li>
    )
}
