import { getQueryParam, handleDeleteQueryParam, Modal, queryParamExists } from "@/features/shared/shared";
import { weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { WeeklyPlanTaskByDateComponent } from "@/features/weekly-plans/weekly-plans";

export function ModalWeeklyPlanTasksByDate() {
    const location = useLocation();
    const navigate = useNavigate();
    const show = queryParamExists(location, 'date');
    const date = getQueryParam(location, 'date')!;

    const handleCloseModal = () => handleDeleteQueryParam(location, navigate, 'date');

    const { data, refetch } = useQuery({
        queryKey: ['getWeeklyPlanTasksByDate', date],
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTasks('', '', date, '', ''),
        enabled: !!date
    });

    if (data) return (
        <Modal modal={show} closeModal={handleCloseModal} title={`Tareas del ${date ?? ''}`}>
            <div className="space-y-3">
                {data.data.length === 0 && (<p className="text-center font-light">No existen tareas programadas</p>)}

                {data.data.map(task => (
                    <WeeklyPlanTaskByDateComponent key={task.id} task={task} refetch={refetch} />
                ))}
            </div>
        </Modal>
    )
}
