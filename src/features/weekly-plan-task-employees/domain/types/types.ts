import { WeeklyPlanEmployeeSchema, WeeklyPlanTaskEmployeeSchema } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";
import type { z } from "zod";

export type WeeklyPlanEmployee = z.infer<typeof WeeklyPlanEmployeeSchema>;
export type WeeklyPlanTaskEmployee = z.infer<typeof WeeklyPlanTaskEmployeeSchema>;

export type ConfirmedWeeklyPlanTaskEmployee = Pick<WeeklyPlanEmployee, 'code' | 'name' | 'position'> & {
    line_activity_id: number | null;
}

export type ConfirmWeeklyPlanTaskEmployeesForm = {
    employees: ConfirmedWeeklyPlanTaskEmployee[];
}

export type ConfirmWeeklyPlanTaskEmployeesByPositionForm = {
    employees: Pick<WeeklyPlanEmployee, 'code' | 'name' | 'position'>[];
}

export type UpdateWeeklyPlanTaskEmployeeActivityForm = {
    line_activity_id: number;
}

export type CandidateAction = 'keep' | 'remove' | 'replace';

export type CandidateRow = {
    candidate: WeeklyPlanEmployee;
    action: CandidateAction;
    replacementId?: string;
    lineActivityId?: number;
}

export type CandidateRowChange = Omit<CandidateRow, 'candidate'>;

export type AdditionRow = {
    employeeId: string;
    lineActivityId?: number;
}

export type AddedEmployee = {
    employee: WeeklyPlanEmployee;
    lineActivityId?: number;
}

export type StaffMode = 'confirm' | 'edit' | 'readonly';

export type EmployeeOption = {
    value: string;
    label: string;
    name: string;
    code: string;
    position: string;
}

export type ConfirmSummary = {
    finalCount: number;
    replacements: number;
    additions: number;
    removals: number;
    pendingReplacements: number;
    pendingActivities: number;
}

export type ActivitySlot = {
    id: number;
    activity: string;
    unit: string;
    quantity: number;
    used: number;
    remaining: number;
}

export type BoardTarget = number | null;

export type BoardCard = {
    key: string;
    name: string;
    code: string;
    position: string | null;
    activityId?: number;
    tag?: string;
    replaced?: boolean;
}

export type StationAddConfig = {
    options: EmployeeOption[];
    isLoading: boolean;
    onAdd: (employeeId: string, lineActivityId: number) => void;
}

export type BoardCardActions = {
    onRemove?: (key: string) => void;
    onReplace?: (key: string, employeeId: string) => void;
    onUndoReplace?: (key: string) => void;
    getReplacementOptions?: (key: string) => EmployeeOption[];
    isLoadingOptions?: boolean;
}

export type BoardCardKind = 'candidate' | 'addition';

export type ZoneTone = 'idle' | 'eligible' | 'over' | 'blocked';

export type PendingActivityMove = {
    id: number;
    lineActivityId: number;
}
