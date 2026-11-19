import type { Option } from "@/features/shared/shared";
import { getPositionActivityLabel, type Position } from "@/features/positions/positions";
import type { WeeklyPlan } from "@/features/weekly-plans/weekly-plans";

export const toPositionOptions = (positions: Position[]): Option[] =>
    positions.map((position) => ({ value: position.id, label: `${position.code} · ${getPositionActivityLabel(position)}` }));

export const toWeeklyPlanOptions = (plans: WeeklyPlan[]): Option[] =>
    plans.map((plan) => ({ value: plan.id, label: `Semana ${plan.week} · ${plan.year}` }));
