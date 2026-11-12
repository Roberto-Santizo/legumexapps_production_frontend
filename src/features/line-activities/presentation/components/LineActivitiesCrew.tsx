import { crewShade, LineActivityCrewGroup, peopleLabel, type LineActivity } from "@/features/line-activities/line-activities";

type Props = {
    activities: LineActivity[];
    total: number;
}

export function LineActivitiesCrew({ activities, total }: Props) {
    const summary = activities.map(item => `${item.quantity} ${item.activity}`).join(', ');

    return (
        <div className="flex flex-wrap items-end gap-x-8 gap-y-5 border-b border-line bg-canvas/40 px-5 py-5">
            <div className="shrink-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">Cuadrilla</p>
                <p className="mt-1 font-mono text-4xl leading-none tracking-tight text-ink tabular-nums">{total}</p>
            </div>

            <ul className="flex min-w-0 flex-1 flex-wrap items-end gap-x-6 gap-y-4" aria-label={`${peopleLabel(total)}: ${summary}`}>
                {activities.map((item, index) => (
                    <LineActivityCrewGroup key={item.id} item={item} shade={crewShade(index)} />
                ))}
            </ul>
        </div>
    )
}
