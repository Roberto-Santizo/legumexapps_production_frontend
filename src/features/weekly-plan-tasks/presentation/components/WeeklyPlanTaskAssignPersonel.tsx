import { MotionConfig } from "framer-motion";
import { ErrorComponent, FadeSwitch, Loading } from "@/features/shared/shared";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { WeeklyPlanTaskHeader, weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { ConfirmByPositionPanel, getStaffMode, hasTaskPositions, WeeklyPlanTaskEmployeesConfirm, WeeklyPlanTaskEmployeesRoster, WeeklyPlanTaskStaffHeader } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

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
      <MotionConfig reducedMotion="user">
        <div className="space-y-6">
          <WeeklyPlanTaskHeader task={data} />

          <FadeSwitch switchKey={mode} className="space-y-6">
            <WeeklyPlanTaskStaffHeader status={data.status} />

            {mode === 'confirm' && showCandidates && <ConfirmByPositionPanel taskId={id!} />}

            {mode === 'confirm'
              ? <WeeklyPlanTaskEmployeesConfirm taskId={id!} lineCode={data.line_code} showCandidates={showCandidates} />
              : <WeeklyPlanTaskEmployeesRoster taskId={id!} lineCode={data.line_code} editable={mode === 'edit'} />}
          </FadeSwitch>
        </div>
      </MotionConfig>
    )
  }
}
