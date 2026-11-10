import { useRef, useState, type SyntheticEvent } from "react";

type AudioEvent = SyntheticEvent<HTMLAudioElement>;

export const useAssistantAudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(Number.NaN);

    const toggle = async () => {
        const audio = audioRef.current;

        if (!audio) return;

        if (!audio.paused) {
            audio.pause();
            return;
        }

        setFailed(false);
        setLoading(true);

        try {
            await audio.play();
        } catch {
            setFailed(true);
            setLoading(false);
        }
    }

    const seek = (value: number) => {
        const audio = audioRef.current;

        if (!audio || !Number.isFinite(audio.duration)) return;

        audio.currentTime = value;
        setCurrentTime(value);
    }

    const syncDuration = (event: AudioEvent) => setDuration(event.currentTarget.duration);

    const audioProps = {
        ref: audioRef,
        onPlay: () => setPlaying(true),
        onPause: () => setPlaying(false),
        onEnded: () => setPlaying(false),
        onWaiting: () => setLoading(true),
        onPlaying: () => setLoading(false),
        onTimeUpdate: (event: AudioEvent) => setCurrentTime(event.currentTarget.currentTime),
        onLoadedMetadata: syncDuration,
        onDurationChange: syncDuration,
        onError: () => {
            setFailed(true);
            setLoading(false);
            setPlaying(false);
        }
    };

    const progress = Number.isFinite(duration) && duration > 0 ? Math.min(currentTime / duration, 1) : 0;

    return { audioProps, playing, loading, failed, currentTime, duration, progress, toggle, seek };
}
