import type { CaptureType } from "@/features/capture-fields/capture-fields";
import { PerformanceRecordsSkeleton, WeeklyPlanTaskPerformanceRecordsPanel } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { WeeklyPlanTaskLotRecordsPanel } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";
import type { WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

type Props = {
    task: WeeklyPlanTask;
    captureType: CaptureType | undefined;
    isLoading: boolean;
}

export function WeeklyPlanTaskCaptureRecordsPanel({ task, captureType, isLoading }: Props) {
    const props = { weeklyPlanTaskId: String(task.id), lineCode: task.line_code, editable: task.status === 4 };

    if (isLoading) return <PerformanceRecordsSkeleton />;

    if (captureType === 'lot') return <WeeklyPlanTaskLotRecordsPanel {...props} />;

    return <WeeklyPlanTaskPerformanceRecordsPanel {...props} />;
}
