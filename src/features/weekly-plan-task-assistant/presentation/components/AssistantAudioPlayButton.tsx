import { LoaderCircle, Pause, Play } from "lucide-react";

type Props = {
    playing: boolean;
    loading: boolean;
    onToggle: () => void;
};

export function AssistantAudioPlayButton({ playing, loading, onToggle }: Props) {
    const Icon = loading ? LoaderCircle : playing ? Pause : Play;
    const iconClass = loading ? 'animate-spin motion-reduce:animate-none' : playing ? 'fill-current' : 'translate-x-px fill-current';

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={playing ? 'Pausar resumen' : 'Reproducir resumen'}
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-ink text-surface transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95 motion-reduce:transition-none"
        >
            <Icon className={`size-4 ${iconClass}`} />
        </button>
    )
}
