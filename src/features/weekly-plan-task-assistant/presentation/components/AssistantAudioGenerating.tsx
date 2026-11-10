import { AudioLines } from "lucide-react";
import { AssistantAudioWaveform } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

export function AssistantAudioGenerating({ id }: { id: string }) {
    return (
        <div className="flex w-full max-w-md items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5" aria-live="polite">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-canvas text-ink-muted">
                <AudioLines className="size-4" />
            </span>
            <div className="min-w-0 flex-1 space-y-1">
                <AssistantAudioWaveform seed={id} generating />
                <p className="font-mono text-[11px] tracking-wide text-ink-muted">
                    Generando audio… puede tardar hasta un par de minutos
                </p>
            </div>
        </div>
    )
}
