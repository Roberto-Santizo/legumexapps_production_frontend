
import { Box, ButtonBase, Paper, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { CalendarCell, CalendarEventItem } from "@/features/weekly-plans/weekly-plans";

interface CalendarWeeklyPlanProps {
  events?: CalendarEventItem[];
  onDateClick?: (date: string) => void;
}

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildMonthGrid(currentMonth: Date): CalendarCell[] {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDayOfMonth.getDay();

  const cells: CalendarCell[] = [];

  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month, -i), isCurrentMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ date: new Date(year, month, day), isCurrentMonth: true });
  }

  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({
      date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
      isCurrentMonth: false,
    });
  }

  return cells;
}

export function Calendar({ events, onDateClick }: CalendarWeeklyPlanProps) {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const calendarEvents = events ?? [];

  const todayKey = toDateKey(today);
  const cells = useMemo(() => buildMonthGrid(currentMonth), [currentMonth]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEventItem[]>();
    calendarEvents.forEach((event) => {
      const key = event.date.slice(0, 10);
      const list = map.get(key) ?? [];
      list.push(event);
      map.set(key, list);
    });
    return map;
  }, [calendarEvents]);

  function handlePrevMonth() {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  function handleNextMonth() {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

  function handleToday() {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  }

  function handleDayClick(date: Date) {
    const key = toDateKey(date);
    setSelectedDate(key);
    onDateClick?.(key);
  }

  return (
    <div className="space-y-5">
      <Paper elevation={0} className="rounded-2xl border border-line bg-surface p-6">
        <Box className="mb-5 flex items-center justify-between">
          <Typography className="text-[18px] font-semibold text-ink">
            {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Typography>

          <Box className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToday}
              className="rounded-lg border border-line px-3 py-1 text-sm text-ink-muted transition-colors hover:bg-canvas"
            >
              Hoy
            </button>
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Mes anterior"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors hover:bg-canvas"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Mes siguiente"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors hover:bg-canvas"
            >
              <ChevronRight size={18} />
            </button>
          </Box>
        </Box>

        <Box className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS.map((day) => (
            <Typography
              key={day}
              align="center"
              className="text-[12px] font-semibold uppercase tracking-wider text-ink-subtle"
            >
              {day}
            </Typography>
          ))}
        </Box>

        <Box className="grid grid-cols-7 gap-1">
          {cells.map(({ date, isCurrentMonth }) => {
            const key = toDateKey(date);
            const dayEvents = eventsByDate.get(key) ?? [];
            const isToday = key === todayKey;
            const isSelected = key === selectedDate;

            return (
              <ButtonBase
                key={key}
                onClick={() => handleDayClick(date)}
                className={`flex min-h-23 flex-col items-start justify-start rounded-xl border p-2 text-left transition-colors ${isSelected ? "border-ink" : "border-line hover:bg-canvas"
                  } ${isCurrentMonth ? "bg-surface" : "bg-canvas/60"}`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${isToday
                    ? "bg-ink font-semibold text-white"
                    : isCurrentMonth
                      ? "text-ink"
                      : "text-ink-subtle"
                    }`}
                >
                  {date.getDate()}
                </span>

                <div className="mt-1 w-full space-y-0.5">
                  {dayEvents.slice(0, 2).map((event, index) => (
                    <div
                      key={event.id ?? index}
                      title={event.title}
                      className="truncate rounded-md px-1.5 py-0.5 text-[11px] text-white"
                      style={{ backgroundColor: "#1a1a19" }}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-[11px] text-ink-subtle">+{dayEvents.length - 2} más</div>
                  )}
                </div>
              </ButtonBase>
            );
          })}
        </Box>
      </Paper>
    </div>
  );
}
