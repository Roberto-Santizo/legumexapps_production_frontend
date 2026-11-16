import type { ActivityOption } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    id: string;
    options: ActivityOption[];
    value?: number;
    onChange: (lineActivityId?: number) => void;
    disabled?: boolean;
}

export function ActivitySelect({ id, options, value, onChange, disabled = false }: Props) {
    const pending = value === undefined;

    return (
        <select
            id={id}
            value={value ?? ''}
            disabled={disabled}
            aria-invalid={pending}
            onChange={(event) => onChange(event.target.value === '' ? undefined : Number(event.target.value))}
            className={`h-9 w-full cursor-pointer rounded-lg border bg-surface px-3 text-sm shadow-sm transition-colors focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/10 disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-sm ${pending ? 'border-dashed border-line-strong text-ink-muted' : 'border-line text-ink hover:border-line-strong'}`}
        >
            <option value="">Elegir actividad</option>
            {options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label} · {option.detail}
                </option>
            ))}
        </select>
    )
}
