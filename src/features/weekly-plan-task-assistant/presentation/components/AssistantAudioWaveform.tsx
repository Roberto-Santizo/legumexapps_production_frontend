import { getWaveformBars } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type Props = {
    seed: string;
    progress?: number;
    generating?: boolean;
};

export function AssistantAudioWaveform({ seed, progress = 0, generating = false }: Props) {
    const bars = getWaveformBars(seed);

    return (
        <div className="flex h-8 w-full items-center justify-between gap-px" aria-hidden="true">
            {bars.map((height, index) => {
                const played = !generating && (index + 1) / bars.length <= progress;
                const tone = generating ? 'bg-ink-subtle animate-pulse motion-reduce:animate-none' : played ? 'bg-ink' : 'bg-line-strong';

                return (
                    <span
                        key={index}
                        className={`w-[3px] rounded-full transition-colors duration-150 ${tone}`}
                        style={{ height: `${height}%`, animationDelay: generating ? `${(index % 10) * 120}ms` : undefined }}
                    />
                )
            })}
        </div>
    )
}
