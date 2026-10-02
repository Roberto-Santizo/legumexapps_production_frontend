import { weeklyPlanProvider } from "@/features/weekly-plans/weekly-plans";
import { defaultWeeklyPlanEmployeeFilters, getWeeklyPlanEmployeeConflict, weeklyPlanEmployeeProvider, type WeeklyPlanEmployeeForm } from "@/features/weekly-plan-employees/weekly-plan-employees";

export const assertWeeklyPlanEmployeeAvailability = async (payload: WeeklyPlanEmployeeForm, excludeId?: number): Promise<void> => {
    const plan = await weeklyPlanProvider.getWeeklyPlanById(`${payload.weekly_plan_id}`);
    const { data } = await weeklyPlanEmployeeProvider.getWeeklyPlanEmployees('', '', {
        ...defaultWeeklyPlanEmployeeFilters,
        week: `${plan.week}`,
        year: `${plan.year}`
    });

    const conflict = getWeeklyPlanEmployeeConflict(data, payload, excludeId);
    if (conflict) throw new Error(conflict);
}
