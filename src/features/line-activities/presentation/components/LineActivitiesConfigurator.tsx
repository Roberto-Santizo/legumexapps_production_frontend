import { handleSetQueryParam } from "@/features/shared/shared";
import { crewShade, LineActivitiesCrew, LineActivitiesEmptyState, LineActivitiesHeader, lineActivitiesProvider, lineActivitiesQueryKey, LineActivityRow, ModalAssignLineActivity, ModalEditLineActivity, totalHeadcount, useRemoveLineActivity } from "@/features/line-activities/line-activities";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
    lineCode: string;
}

export function LineActivitiesConfigurator({ lineCode }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [assign, setAssign] = useState(false);
    const { handleRemoveActivity, isRemoving } = useRemoveLineActivity(lineCode);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: lineActivitiesQueryKey(lineCode),
        queryFn: () => lineActivitiesProvider.getLineActivities(lineCode),
        retry: false
    });

    const activities = data ?? [];
    const total = totalHeadcount(activities);

    return (
        <section className="overflow-hidden rounded-2xl border border-line bg-surface">
            <LineActivitiesHeader total={total} count={activities.length} onAdd={() => setAssign(true)} />

            {isLoading && (
                <div className="space-y-px">
                    {[0, 1, 2].map(index => (
                        <div key={index} className="flex animate-pulse gap-6 px-5 py-4 motion-reduce:animate-none">
                            <span className="h-2.5 w-6 rounded-full bg-canvas" />
                            <span className="h-2.5 flex-1 rounded-full bg-canvas" />
                        </div>
                    ))}
                </div>
            )}

            {isError && <p className="px-5 py-10 text-center text-sm text-ink-muted">{error.message}</p>}

            {data && activities.length === 0 && (
                <div className="p-5">
                    <LineActivitiesEmptyState onAdd={() => setAssign(true)} />
                </div>
            )}

            {activities.length > 0 && (
                <>
                    <LineActivitiesCrew activities={activities} total={total} />

                    <ul className="divide-y divide-line">
                        {activities.map((item, index) => (
                            <LineActivityRow
                                key={item.id}
                                item={item}
                                shade={crewShade(index)}
                                busy={isRemoving}
                                onEdit={() => handleSetQueryParam(location, navigate, 'editLineActivity', `${item.id}`)}
                                onRemove={() => handleRemoveActivity(item)}
                            />
                        ))}
                    </ul>
                </>
            )}

            <ModalAssignLineActivity open={assign} close={() => setAssign(false)} lineCode={lineCode} assigned={activities} />

            <ModalEditLineActivity lineCode={lineCode} activities={activities} />
        </section>
    )
}
