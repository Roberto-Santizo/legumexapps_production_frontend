import { MotionConfig } from "framer-motion";
import { ErrorComponent, FadeSwitch, Loading } from "@/features/shared/shared";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { WeeklyPlanTaskHeader, weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useLineByCode } from "@/features/lines/lines";
import { ConfirmByPositionPanel, getStaffMode, hasTaskPositions, WeeklyPlanTaskEmployeesConfirm, WeeklyPlanTaskEmployeesRoster, WeeklyPlanTaskStaffHeader } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

export function WeeklyPlanTaskAssignPersonel() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getWeeklyPlanTaskById', id],
    queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(id!),
    retry: false
  });

  const lineQuery = useLineByCode(data?.line_code ?? '', Boolean(data));

  if (isLoading || lineQuery.isLoading) return <Loading />
  if (isError) return <ErrorComponent message={error.message} />
  if (data) {
    const mode = getStaffMode(data.status);
    const isWildcard = lineQuery.data?.is_wildcard ?? false;
    const showCandidates = !isWildcard && hasTaskPositions(data.positions);

    return (
      <MotionConfig reducedMotion="user">
        <div className="space-y-6">
          <WeeklyPlanTaskHeader task={data} />

          <FadeSwitch switchKey={mode} className="space-y-6">
            <WeeklyPlanTaskStaffHeader status={data.status} />

            {mode === 'confirm' && showCandidates && <ConfirmByPositionPanel taskId={id!} />}

            {mode === 'confirm'
              ? <WeeklyPlanTaskEmployeesConfirm taskId={id!} lineSkuId={data.line_sku_id} showCandidates={showCandidates} allowUnassigned={isWildcard} />
              : <WeeklyPlanTaskEmployeesRoster taskId={id!} lineSkuId={data.line_sku_id} editable={mode === 'edit'} />}
          </FadeSwitch>
        </div>
      </MotionConfig>
    )
  }
}
