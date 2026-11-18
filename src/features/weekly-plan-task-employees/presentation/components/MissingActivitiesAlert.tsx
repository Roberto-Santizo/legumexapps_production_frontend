import { Collapse } from "@/features/shared/shared";
import { AlertTriangleIcon } from "lucide-react";

type Props = {
    count: number;
    editable: boolean;
}

export function MissingActivitiesAlert({ count, editable }: Props) {
    return (
        <Collapse show={count > 0}>
            <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50/60 px-5 py-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                    <AlertTriangleIcon className="size-4" aria-hidden="true" />
                    {count === 1 ? '1 empleado sin actividad' : `${count} empleados sin actividad`}
                </p>

                <p className="mt-1 pl-6 text-sm text-amber-700">
                    {editable
                        ? 'Fueron asignados antes de las actividades por línea. Arrástralos a una actividad del tablero.'
                        : 'Fueron asignados antes de las actividades por línea.'}
                </p>
            </div>
        </Collapse>
    )
}
