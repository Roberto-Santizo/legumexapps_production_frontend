import { formatDateValue, getIsoWeekDates } from "@/features/shared/shared";

export type ProductionWeekDay = {
    date: string;
    initial: string;
    dayNumber: number;
    isToday: boolean;
};

const WEEK_DAY_INITIALS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export const getIsoWeek = (date: Date): { week: number; year: number } => {
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const weekDayOffset = (target.getDay() + 6) % 7;
    target.setDate(target.getDate() - weekDayOffset + 3);
    const firstThursday = new Date(target.getFullYear(), 0, 4);
    const firstThursdayOffset = (firstThursday.getDay() + 6) % 7;
    firstThursday.setDate(firstThursday.getDate() - firstThursdayOffset + 3);
    const week = 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000));

    return { week, year: target.getFullYear() };
};

export const getProductionWeekDays = (date: Date): ProductionWeekDay[] => {
    const { week, year } = getIsoWeek(date);
    const today = formatDateValue(date);

    return getIsoWeekDates(week, year).map((value, index) => ({
        date: value,
        initial: WEEK_DAY_INITIALS[index],
        dayNumber: Number(value.split('-')[2]),
        isToday: value === today,
    }));
};

export const formatLongDate = (date: Date): string => {
    const formatted = date.toLocaleDateString('es-GT', { weekday: 'long', day: 'numeric', month: 'long' });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};
