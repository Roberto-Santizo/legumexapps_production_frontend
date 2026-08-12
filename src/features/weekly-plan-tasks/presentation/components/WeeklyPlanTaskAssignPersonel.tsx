import { Loading } from "@/features/shared/shared";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { WeeklyPlanTaskHeader, weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export function WeeklyPlanTaskAssignPersonel() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['getWeeklyPlanTaskById', id],
    queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(id!)
  });

  if (isLoading) return <Loading />
  if (data) return (
    <div className="space-y-5">
      <WeeklyPlanTaskHeader task={data} />

    </div>
  )
}
