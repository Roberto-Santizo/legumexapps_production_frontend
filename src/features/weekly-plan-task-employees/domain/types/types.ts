import { WeeklyPlanEmployeeSchema, WeeklyPlanTaskEmployeeSchema } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";
import type { z } from "zod";

export type WeeklyPlanEmployee = z.infer<typeof WeeklyPlanEmployeeSchema>;
export type WeeklyPlanTaskEmployee = z.infer<typeof WeeklyPlanTaskEmployeeSchema>;

export type ConfirmedWeeklyPlanTaskEmployee = Pick<WeeklyPlanEmployee, 'code' | 'name' | 'position'>;

export type ConfirmWeeklyPlanTaskEmployeesForm = {
    employees: ConfirmedWeeklyPlanTaskEmployee[];
}

export type WeeklyPlanTaskEmployeeForm = {
    weekly_plan_employee_id: string;
}

export type CandidateAction = 'keep' | 'remove' | 'replace';

export type CandidateRow = {
    candidate: WeeklyPlanEmployee;
    action: CandidateAction;
    replacementId?: string;
}

export type CandidateRowChange = Omit<CandidateRow, 'candidate'>;

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
}
