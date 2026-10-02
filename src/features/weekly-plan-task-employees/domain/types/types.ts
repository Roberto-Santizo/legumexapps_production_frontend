import { WeeklyPlanEmployeeSchema, WeeklyPlanTaskEmployeeSchema } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";
import type { z } from "zod";

export type WeeklyPlanEmployee = z.infer<typeof WeeklyPlanEmployeeSchema>;
export type WeeklyPlanTaskEmployee = z.infer<typeof WeeklyPlanTaskEmployeeSchema>;

export type WeeklyPlanTaskEmployeeReplacement = {
    weekly_plan_employee_id: number;
    replacement_weekly_plan_employee_id: number;
}

export type ConfirmWeeklyPlanTaskEmployeesForm = {
    replacements: WeeklyPlanTaskEmployeeReplacement[];
    additions: number[];
    removals: number[];
}

export type WeeklyPlanTaskEmployeeForm = {
    weekly_plan_employee_id: number;
}

export type CandidateAction = 'keep' | 'remove' | 'replace';

export type CandidateRow = {
    candidate: WeeklyPlanEmployee;
    action: CandidateAction;
    replacementId?: number;
}

export type CandidateRowChange = Omit<CandidateRow, 'candidate'>;

export type StaffMode = 'confirm' | 'edit' | 'readonly';

export type EmployeeOption = {
    value: number;
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
}
