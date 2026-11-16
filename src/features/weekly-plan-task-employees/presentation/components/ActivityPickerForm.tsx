import { useForm, useWatch } from "react-hook-form";
import { CustomFilledButton, CustomForm } from "@/features/shared/shared";
import type { ActivityOption, UpdateWeeklyPlanTaskEmployeeActivityForm } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    options: ActivityOption[];
    currentId: number | null;
    isPending: boolean;
    onSubmit: (lineActivityId: number) => void;
}

export function ActivityPickerForm({ options, currentId, isPending, onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<UpdateWeeklyPlanTaskEmployeeActivityForm>({
        defaultValues: currentId === null ? {} : { line_activity_id: currentId }
    });

    const selected = Number(useWatch({ control, name: 'line_activity_id' }));

    return (
        <CustomForm onSubmit={handleSubmit((form) => onSubmit(Number(form.line_activity_id)))} className="border-none p-0 shadow-none">
            <fieldset className="flex min-w-0 flex-col gap-2">
                <legend className="mb-2 text-sm font-medium text-ink">Actividad de la línea</legend>

                {options.length === 0 && (
                    <p className="rounded-xl border border-line px-5 py-8 text-center text-sm text-ink-subtle">La línea no tiene actividades configuradas.</p>
                )}

                <div className="max-h-[22rem] divide-y divide-line overflow-y-auto overscroll-contain rounded-xl border border-line bg-surface empty:hidden">
                    {options.map((option) => (
                        <label
                            key={option.value}
                            className={`flex items-center gap-3 border-l-[3px] px-4 py-3 transition-colors motion-reduce:transition-none ${option.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-canvas/40'} ${selected === option.value ? 'border-ink bg-canvas/70' : 'border-transparent'}`}
                        >
                            <input
                                type="radio"
                                value={option.value}
                                disabled={option.disabled}
                                className="size-4 accent-ink"
                                {...register('line_activity_id', { required: 'Selecciona una actividad' })}
                            />

                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium tracking-wide text-ink">
                                    {option.label}
                                    {option.value === currentId && <span className="ml-2 text-[11px] font-normal tracking-normal text-ink-subtle">actual</span>}
                                </span>
                                <span className="block font-mono text-[11px] text-ink-subtle">{option.detail}</span>
                            </span>
                        </label>
                    ))}
                </div>

                <p className="text-xs text-red-400">{errors.line_activity_id?.message}</p>
            </fieldset>

            <CustomFilledButton type="submit" label="Guardar actividad" disabled={isPending || options.length === 0} isLoading={isPending} fullWitdh />
        </CustomForm>
    )
}
