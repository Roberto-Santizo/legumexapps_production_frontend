import { Calendar, ModalWeeklyPlanTasksByDate, weeklyPlanProvider } from '@/features/weekly-plans/weekly-plans';
import { handleSetQueryParam, Loading, Title } from '@/features/shared/shared';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export function CalendarWeeklyPlan() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['getWeeklyPlanTasksForCalendarById', id],
    queryFn: () => weeklyPlanProvider.getWeeklyPlanTasksForCalendarById(id!)
  });

  const onDateClick = (data: string) => handleSetQueryParam(location, navigate, 'date', data);

  if (isLoading) return <Loading />
  if (data) return (
    <div className="space-y-5">
      <Title title="Calendario" subtitle="Calendario de planificación" />

      <section>
        <Calendar onDateClick={onDateClick} events={data} />
      </section>

      <ModalWeeklyPlanTasksByDate events={data} />
    </div>
  )
}
