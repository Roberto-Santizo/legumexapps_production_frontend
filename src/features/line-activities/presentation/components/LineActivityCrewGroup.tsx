import { crewMarks, type LineActivity } from "@/features/line-activities/line-activities";

type Props = {
    item: LineActivity;
    shade: string;
}

export function LineActivityCrewGroup({ item, shade }: Props) {
    return (
        <li className="flex min-w-0 flex-col gap-2">
            <div className="flex flex-wrap gap-1" aria-hidden="true">
                {crewMarks(item.quantity).map(mark => (
                    <span key={mark} className={`h-6 w-1.5 rounded-[2px] ${shade}`} />
                ))}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
                <span className="text-ink">{item.quantity}</span> {item.activity}
            </p>
        </li>
    )
}
