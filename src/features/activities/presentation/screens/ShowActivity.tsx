import { CustomFilledButton, ErrorComponent, InformationField, Loading, Title } from "@/features/shared/shared";
import { activityByIdQueryKey, activityProvider, useDeleteActivity } from "@/features/activities/activities";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowActivity() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleDeleteActivity, isDeleting } = useDeleteActivity(() => navigate('/actividades'));

    const { data, isLoading, isError, error } = useQuery({
        queryKey: activityByIdQueryKey(id!),
        queryFn: () => activityProvider.getActivityById(id!),
        retry: false
    });

    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <Title title={data.name} subtitle="Actividad del catálogo" />

                <div className="flex gap-3">
                    <CustomFilledButton
                        label="Editar"
                        type="button"
                        icon={<EditIcon className="size-4" />}
                        onClick={() => navigate(`/actividades/${data.id}/editar`)}
                    />
                    <CustomFilledButton
                        label="Eliminar"
                        type="button"
                        icon={<Trash2Icon className="size-4" />}
                        disabled={isDeleting}
                        onClick={() => handleDeleteActivity(data)}
                    />
                </div>
            </div>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 rounded-xl border border-line bg-surface px-5 py-4 sm:grid-cols-4">
                <InformationField label="Nombre" value={data.name} />
                <InformationField label="Unidad de medida" value={data.unit} mono />
            </dl>

            <p className="text-sm text-ink-muted">
                La misma actividad sirve para todas las líneas; cada línea define cuántas personas necesita. Solo se puede eliminar si no está asignada a ninguna línea.
            </p>
        </div>
    )
}
