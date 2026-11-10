import { ErrorComponent, Loading } from "@/features/shared/shared";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { WeeklyPlanTaskHeader, weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { getStaffMode, hasTaskPositions, ModalAddWeeklyPlanTaskEmployee, ModalReplaceWeeklyPlanTaskEmployee, WeeklyPlanTaskEmployeesConfirm, WeeklyPlanTaskEmployeesRoster, WeeklyPlanTaskStaffHeader } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export function WeeklyPlanTaskAssignPersonel() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getWeeklyPlanTaskById', id],
    queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(id!),
    retry: false
  });

  if (isLoading) return <Loading />
  if (isError) return <ErrorComponent message={error.message} />
  if (data) {
    const mode = getStaffMode(data.status);
    const showCandidates = hasTaskPositions(data.positions);

    return (
      <div className="space-y-6">
        <WeeklyPlanTaskHeader task={data} />

        <WeeklyPlanTaskStaffHeader status={data.status} />

        {mode === 'confirm'
          ? <WeeklyPlanTaskEmployeesConfirm taskId={id!} positions={data.positions} showCandidates={showCandidates} />
          : <WeeklyPlanTaskEmployeesRoster taskId={id!} editable={mode === 'edit'} />}

        <ModalAddWeeklyPlanTaskEmployee taskId={id!} />
        <ModalReplaceWeeklyPlanTaskEmployee taskId={id!} />
      </div>
    )
  }
}
