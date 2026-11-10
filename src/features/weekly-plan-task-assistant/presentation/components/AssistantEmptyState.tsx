import { ASSISTANT_EXAMPLE_GROUPS } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type Props = {
    onPick: (question: string) => void;
    disabled?: boolean;
};

export function AssistantEmptyState({ onPick, disabled = false }: Props) {
    return (
        <div className="mx-auto w-full max-w-3xl px-6 py-10">
            <h2 className="text-xl font-semibold tracking-tight text-ink">¿Qué quieres saber de las tareas del plan?</h2>
            <p className="mt-1.5 max-w-xl text-sm text-ink-muted">
                Acota cada pregunta a una tarea, un plan, una semana con su año o un rango de fechas. El asistente solo consulta; no modifica tareas ni tomas.
            </p>

            <dl className="mt-8 divide-y divide-line border-y border-line">
                {ASSISTANT_EXAMPLE_GROUPS.map((group) => (
                    <div key={group.family} className="grid gap-2 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                        <dt className="pt-2 font-mono text-[11px] tracking-wider text-ink-subtle uppercase">{group.family}</dt>
                        <dd className="flex flex-col gap-1">
                            {group.questions.map((question) => (
                                <button
                                    key={question}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => onPick(question)}
                                    className="cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-canvas focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {question}
                                </button>
                            ))}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
