export interface CalendarEventItem {
  id: number | string;
  date: string;
  title: string;
  color: string;
}

export interface CalendarCell {
  date: Date;
  isCurrentMonth: boolean;
}