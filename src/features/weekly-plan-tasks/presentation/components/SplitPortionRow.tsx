import { getPortionSwatch, type SplitWeeklyPlanTaskForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Trash2Icon } from "lucide-react";

type Props = {
    index: number;
    register: UseFormRegister<SplitWeeklyPlanTaskForm>;
    errors: FieldErrors<SplitWeeklyPlanTaskForm>;
    canRemove: boolean;
    onRemove: () => void;
}

export function SplitPortionRow({ index, register, errors, canRemove, onRemove }: Props) {
    const portionErrors = errors.portions?.[index];
    const boxesId = `portion-${index}-boxes`;
    const dateId = `portion-${index}-date`;

    return (
        <li className="grid grid-cols-[auto_1fr_auto] items-start gap-x-3 gap-y-3 rounded-xl border border-line bg-surface p-3 transition-colors duration-150 hover:border-line-strong sm:grid-cols-[auto_1fr_1fr_auto]">
            <div className="flex h-9 items-center gap-2 sm:mt-6">
                <span className={`size-2.5 rounded-full ${getPortionSwatch(index)}`} aria-hidden />
                <span className="font-mono text-xs font-semibold tabular-nums text-ink-muted">P{index + 1}</span>
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor={boxesId} className="text-xs font-medium text-ink-muted">Cajas</label>
                <input
                    id={boxesId}
                    {...register(`portions.${index}.boxes`, {
                        required: "Ingresa las cajas",
                        min: { value: 1, message: "Debe ser al menos 1" },
                        valueAsNumber: true
                    })}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    placeholder="0"
                    autoComplete="off"
                    className={`font-mono tabular-nums ${portionErrors?.boxes ? "text_form_field_error" : "text_form_field"}`}
                />
                {portionErrors?.boxes && <p className="text-xs text-red-600">{portionErrors.boxes.message}</p>}
            </div>

            <div className="col-start-2 flex flex-col gap-1.5 sm:col-start-auto">
                <label htmlFor={dateId} className="text-xs font-medium text-ink-muted">Fecha de operación</label>
                <input
                    id={dateId}
                    {...register(`portions.${index}.operation_date`, { required: "Selecciona una fecha" })}
                    type="date"
                    className={portionErrors?.operation_date ? "text_form_field_error" : "text_form_field"}
                />
                {portionErrors?.operation_date && <p className="text-xs text-red-600">{portionErrors.operation_date.message}</p>}
            </div>

            <button
                type="button"
                onClick={onRemove}
                disabled={!canRemove}
                aria-label={`Quitar porción ${index + 1}`}
                title={canRemove ? "Quitar porción" : "Se necesitan al menos 2 porciones"}
                className="col-start-3 row-start-1 flex size-9 items-center justify-center rounded-lg text-ink-subtle transition-colors duration-150 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink-subtle sm:col-start-4 sm:mt-6"
            >
                <Trash2Icon className="size-4" />
            </button>
        </li>
    );
}
