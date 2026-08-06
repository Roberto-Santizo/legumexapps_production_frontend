import { ActionsMenu } from "@/features/shared/shared";
import { EyeIcon, PersonStandingIcon, TableIcon } from "lucide-react";
import { ModalUpdateWeeklyPlanTask, type WeeklyPlanTask } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const formatNumber = (value: number | null) => (value ?? 0).toLocaleString('es-GT');

type Props = {
    task: WeeklyPlanTask;
    refetch: () => void;
}

type FieldProps = {
    label: string;
    value: string;
    mono?: boolean;
}

function Field({ label, value, mono }: FieldProps) {
    return (
        <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
                {label}
            </p>

            <p className={`mt-0.5 truncate text-sm text-ink ${mono ? 'font-mono tabular-nums' : ''}`} title={value}>
                {value}
            </p>
        </div>
    )
}

export function WeeklyPlanTaskRowComponent({ task, refetch }: Props) {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const producedBoxes = task.produced_boxes ?? 0;
    const ratio = task.boxes > 0 ? producedBoxes / task.boxes : 0;
    const percent = Math.round(ratio * 100);
    const complete = task.boxes > 0 && producedBoxes >= task.boxes;

    return (
        <article
            className={`grid gap-5 border-l-[3px] px-5 py-5 transition-colors motion-reduce:transition-none sm:grid-cols-[minmax(0,1fr)_13rem_auto] sm:items-center sm:gap-8 ${complete ? 'border-[#4d6b2f] hover:bg-canvas/60' : 'border-transparent hover:border-line-strong hover:bg-canvas/60'}`}
        >
            <div className="min-w-0">
                <h3 className="truncate text-base font-semibold leading-tight tracking-tight text-ink" title={task.sku_name}>
                    {task.sku_name}
                </h3>

                <dl className="mt-3 grid grid-cols-2 gap-x-8 gap-y-3">
                    <Field label="Código" value={task.sku_code} mono />
                    <Field label="Cajas" value={formatNumber(task.boxes)} mono />
                    <Field label="Cliente" value={task.sku_client} />
                    <Field label="Destino" value={task.destination} />
                </dl>
            </div>

            <div className="sm:text-right">
                <p className={`font-mono text-2xl leading-none tabular-nums ${complete ? 'text-[#4d6b2f]' : 'text-ink'}`}>
                    {percent}<span className="text-base text-ink-subtle">%</span>
                </p>

                <p className="mt-2 font-mono text-xs tabular-nums text-ink-muted">
                    {formatNumber(producedBoxes)}
                    <span className="text-ink-subtle"> / {formatNumber(task.boxes)} cajas</span>
                </p>

                <div
                    className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-line"
                    role="progressbar"
                    aria-label={`Avance de cajas de ${task.sku_name}`}
                    aria-valuenow={percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div
                        className={`h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none ${complete ? 'bg-[#4d6b2f]' : 'bg-ink'}`}
                        style={{ width: `${Math.min(ratio, 1) * 100}%` }}
                    />
                </div>
            </div>

            <div className="flex items-center gap-1 justify-self-end">
                {task.status == 2 && (
                    <ActionsMenu
                        items={[
                            { label: "Asignar Personal", icon: <PersonStandingIcon />, onClick: () => navigate(`/planes-semanales/tareas/asignar-personal/${task.id}`) },
                        ]}
                    />
                )}

                {task.status == 4 && (
                    <ActionsMenu
                        items={[
                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/planes-semanales/tareas/${task.id}`) },
                            { label: "Rendimiento", icon: <TableIcon />, onClick: () => navigate(`/planes-semanales/tareas/${task.id}`) },
                        ]}
                    />
                )}

            </div>

            <ModalUpdateWeeklyPlanTask
                modal={modal}
                closeModal={() => setModal(false)}
                refetch={refetch}
                taskId={String(task.id)}
            />
        </article>
    )
}
