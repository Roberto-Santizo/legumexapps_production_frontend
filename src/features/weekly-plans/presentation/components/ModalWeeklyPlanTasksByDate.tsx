import { getQueryParam, handleDeleteQueryParam, Modal, queryParamExists } from "@/features/shared/shared";
import type { CalendarEventItem } from "@/features/weekly-plans/weekly-plans";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    events: CalendarEventItem[];
}

export function ModalWeeklyPlanTasksByDate({ events }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const show = queryParamExists(location, 'date');
    const date = getQueryParam(location, 'date');

    const handleCloseModal = () => handleDeleteQueryParam(location, navigate, 'date');

    const tasks = date ? events.filter((event) => event.date.slice(0, 10) === date) : [];

    return (
        <Modal modal={show} closeModal={handleCloseModal} title={`Tareas del ${date ?? ''}`}>
            <div className="space-y-3">
                {tasks.length === 0 && (
                    <p className="text-sm text-ink-subtle">No hay tareas para esta fecha.</p>
                )}

                {tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 rounded-lg border border-line p-3">
                        <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: task.color }} />
                        <span className="text-sm text-ink">{task.title}</span>
                    </div>
                ))}
            </div>
        </Modal>
    )
}
