import { Download } from "lucide-react";
import { AUDIO_PLAYBACK_ERROR, AssistantAudioPlayButton, AssistantAudioWaveform, formatAudioTime, useAssistantAudioPlayer } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

export function AssistantAudioPlayer({ url }: { url: string }) {
    const { audioProps, playing, loading, failed, currentTime, duration, progress, toggle, seek } = useAssistantAudioPlayer();
    const seekable = Number.isFinite(duration) && duration > 0;

    return (
        <div className="w-full max-w-md rounded-xl border border-line bg-surface px-3 py-2.5">
            <audio {...audioProps} src={url} preload="none" className="hidden" />

            <div className="flex items-center gap-3">
                <AssistantAudioPlayButton playing={playing} loading={loading} onToggle={toggle} />

                <div className="relative min-w-0 flex-1 rounded-md has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink/20">
                    <AssistantAudioWaveform seed={url} progress={progress} />
                    <input
                        type="range"
                        min={0}
                        max={seekable ? duration : 0}
                        step={0.1}
                        value={currentTime}
                        disabled={!seekable}
                        onChange={(event) => seek(Number(event.target.value))}
                        aria-label="Posición del resumen"
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-default"
                    />
                </div>

                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    download
                    aria-label="Descargar resumen"
                    className="shrink-0 rounded-md p-1.5 text-ink-muted transition-colors hover:bg-canvas hover:text-ink focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:outline-none"
                >
                    <Download className="size-4" />
                </a>
            </div>

            <div className="mt-1 flex items-center justify-between pl-12 font-mono text-[11px] tracking-wide text-ink-subtle tabular-nums">
                <span className="text-ink-muted">Resumen en audio</span>
                <span>{formatAudioTime(currentTime)} / {formatAudioTime(duration)}</span>
            </div>

            {failed && <p role="alert" className="mt-1 pl-12 text-[12px] text-red-700">{AUDIO_PLAYBACK_ERROR}</p>}
        </div>
    )
}
