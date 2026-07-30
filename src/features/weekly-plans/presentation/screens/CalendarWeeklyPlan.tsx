import { Calendar, ModalWeeklyPlanTasksByDate, weeklyPlanProvider } from '@/features/weekly-plans/weekly-plans';
import { CustomFilledButton, handleSetQueryParam, Loading, Title } from '@/features/shared/shared';
import { DrawerWeeklyPlanTasks, ModalCreateWeeklyPlanTask } from '@/features/weekly-plan-tasks/weekly-plan-tasks';
import { MenuIcon, PlusIcon } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function CalendarWeeklyPlan() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTasksDrawer, setShowTasksDrawer] = useState(false);

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
        <div className="flex items-center gap-3">
          <CustomFilledButton
            label="Crear Tarea"
            type="button"
            icon={<PlusIcon />}
            onClick={() => setShowCreateModal(true)}
          />

          <button
            type="button"
            onClick={() => setShowTasksDrawer(true)}
            className="rounded-lg border border-line p-2 text-ink hover:bg-gray-100 transition"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <section>
        <Calendar onDateClick={onDateClick} events={data} />
      </section>

      <ModalWeeklyPlanTasksByDate />

      <ModalCreateWeeklyPlanTask
        modal={showCreateModal}
        closeModal={() => setShowCreateModal(false)}
        refetch={refetch}
      />

      <DrawerWeeklyPlanTasks
        open={showTasksDrawer}
        closeDrawer={() => setShowTasksDrawer(false)}
      />
    </div>
  )
}
