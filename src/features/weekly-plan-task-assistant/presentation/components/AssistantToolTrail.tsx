import { getUniqueToolLabels, type AssistantToolActivity } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type Props = {
    activities: AssistantToolActivity[];
};

export function AssistantToolTrail({ activities }: Props) {
    if (activities.length === 0) return null;

    const pending = activities.find((activity) => !activity.done);
    const labels = getUniqueToolLabels(activities);

    if (pending) return (
        <p className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-ink-muted" aria-live="polite">
            <span className="size-1.5 animate-pulse rounded-full bg-ink motion-reduce:animate-none" />
            Consultando {pending.label.toLowerCase()}…
        </p>
    )

    return (
        <p className="font-mono text-[11px] leading-relaxed tracking-wide text-ink-subtle">
            <span className="text-ink-muted">Consultó</span> {labels.join(' · ')}
        </p>
    )
}
