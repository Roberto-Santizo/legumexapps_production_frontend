import { useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp, Square } from "lucide-react";
import { ASSISTANT_MESSAGE_MAX_LENGTH, AssistantDisclaimer } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type Props = {
    busy: boolean;
    onSend: (text: string) => void;
    onStop: () => void;
};

export function AssistantComposer({ busy, onSend, onStop }: Props) {
    const [text, setText] = useState('');
    const trimmed = text.trim();
    const tooLong = text.length > ASSISTANT_MESSAGE_MAX_LENGTH;
    const canSend = !busy && trimmed.length > 0 && !tooLong;

    const submit = () => {
        if (!canSend) return;

        onSend(trimmed);
        setText('');
    }

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        submit();
    }

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return;

        event.preventDefault();
        submit();
    }

    return (
        <form onSubmit={onSubmit} className="mx-auto w-full max-w-3xl px-6 pb-4">
            <div className={`flex items-end gap-2 rounded-2xl border bg-surface p-2 pl-4 transition-colors focus-within:border-ink ${tooLong ? 'border-red-300' : 'border-line-strong'}`}>
                <label htmlFor="assistant-message" className="sr-only">Pregunta para el asistente</label>
                <textarea
                    id="assistant-message"
                    rows={1}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Pregunta por una tarea, un plan, una semana o un rango de fechas"
                    className="max-h-40 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-[14px] text-ink outline-none field-sizing-content placeholder:text-ink-subtle"
                />
                {busy ? (
                    <button
                        type="button"
                        onClick={onStop}
                        aria-label="Detener respuesta"
                        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-line-strong text-ink transition-colors hover:bg-canvas focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:outline-none"
                    >
                        <Square className="size-3.5 fill-current" />
                    </button>
                ) : (
                    <button
                        type="submit"
                        disabled={!canSend}
                        aria-label="Enviar pregunta"
                        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-ink text-surface transition-colors hover:bg-ink/90 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-ink/30"
                    >
                        <ArrowUp className="size-4" />
                    </button>
                )}
            </div>

            <div className="mt-2 flex items-center justify-between gap-4 px-1">
                <AssistantDisclaimer />
                <span className={`shrink-0 font-mono text-[11px] tabular-nums ${tooLong ? 'text-red-600' : 'text-ink-subtle'}`}>
                    {text.length}/{ASSISTANT_MESSAGE_MAX_LENGTH}
                </span>
            </div>
        </form>
    )
}
