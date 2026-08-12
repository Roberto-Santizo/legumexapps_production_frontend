import { positionProvider } from "@/features/positions/positions";
import { useQuery } from "@tanstack/react-query";
import { WorkflowIcon } from "lucide-react";
import type { Line } from "@/features/lines/lines";

type Props = {
    id: Line['id']
}

export function PositionsByLine({ id }: Props) {
    const { data: positions } = useQuery({
        queryKey: ['getPositionsByLineCode', id],
        queryFn: () => positionProvider.getPositions('', '', `${id}`),
    });

    if (positions) return (
        <div>
            {positions.data.length ? (
                <div className="relative overflow-hidden rounded-xl border border-line bg-surface">
                    <div className="absolute inset-y-5 left-[1.6rem] w-px bg-line" aria-hidden="true" />

                    <ul className="divide-y divide-line">
                        {positions.data.map(position => (
                            <li key={position.id} className="relative flex items-center gap-4 px-5 py-4">
                                <span
                                    className={`z-10 size-2.5 shrink-0 rounded-full ring-4 ring-surface ${position.status ? 'bg-[#4d6b2f] ' : 'bg-line-strong'}`}
                                    aria-hidden="true"
                                />

                                <span className="w-24 shrink-0 font-mono text-sm text-ink-muted">{position.code}</span>

                                <span className="flex-1 text-sm text-ink">{position.activity}</span>

                                <span className={`text-xs font-medium ${position.status ? 'text-ink-subtle' : 'text-[#4d6b2f]'}`}>
                                    {position.status ? 'Activo' : 'Inactivo'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface py-10 text-center">
                    <WorkflowIcon className="size-6 text-ink-subtle" />
                    <p className="text-sm text-ink-muted">Esta línea no tiene posiciones registradas</p>
                </div>
            )}
        </div>
    )
}
