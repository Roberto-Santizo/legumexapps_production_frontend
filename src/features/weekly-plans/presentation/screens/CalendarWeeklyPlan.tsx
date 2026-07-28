import { Calendar, ModalWeeklyPlanTasksByDate, weeklyPlanProvider } from '@/features/weekly-plans/weekly-plans';
import { ModalCreateWeeklyPlanTask } from '@/features/weekly-plan-tasks/weekly-plan-tasks';
import { CustomFilledButton, handleSetQueryParam, Loading, Title } from '@/features/shared/shared';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

export function CalendarWeeklyPlan() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['getWeeklyPlanTasksForCalendarById', id],
    queryFn: () => weeklyPlanProvider.getWeeklyPlanTasksForCalendarById(id!)
  });

  const onDateClick = (data: string) => handleSetQueryParam(location, navigate, 'date', data);

  if (isLoading) return <Loading />
  if (data) return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Title title="Calendario" subtitle="Calendario de planificación" />
        <CustomFilledButton
          label="Crear Tarea"
          type="button"
          icon={<PlusIcon />}
          onClick={() => setShowCreateModal(true)}
        />
      </div>

      <section>
        <Calendar onDateClick={onDateClick} events={data} />
      </section>

      <ModalWeeklyPlanTasksByDate events={data} />

      <ModalCreateWeeklyPlanTask
        modal={showCreateModal}
        closeModal={() => setShowCreateModal(false)}
        refetch={refetch}
      />
    </div>
  )
}
