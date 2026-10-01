import type { CandidateAction } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    value: CandidateAction;
    onChange: (action: CandidateAction) => void;
    candidateName: string;
}

const ACTIONS: { value: CandidateAction; label: string }[] = [
    { value: 'keep', label: 'Mantener' },
    { value: 'replace', label: 'Reemplazar' },
    { value: 'remove', label: 'Quitar' },
];

export function CandidateActionToggle({ value, onChange, candidateName }: Props) {
    return (
        <div role="radiogroup" aria-label={`Acción para ${candidateName}`} className="inline-flex shrink-0 rounded-lg border border-line bg-canvas p-0.5">
            {ACTIONS.map((action) => {
                const active = action.value === value;

                return (
                    <button
                        key={action.value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => onChange(action.value)}
                        className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ink motion-reduce:transition-none ${active ? 'bg-ink text-white shadow-sm' : 'text-ink-muted hover:text-ink'}`}
                    >
                        {action.label}
                    </button>
                )
            })}
        </div>
    )
}
