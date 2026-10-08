import { CustomFilledButton, ErrorComponent, InformationField, Loading, Title } from "@/features/shared/shared";
import { CaptureFieldTags, CaptureFieldValueList, canDeleteCaptureField, canEditCaptureField, captureFieldDataTypeLabels, captureFieldScopeLabel, captureFieldsProvider, useDeleteCaptureField } from "@/features/capture-fields/capture-fields";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowCaptureField() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleDeleteCaptureField, isDeleting } = useDeleteCaptureField(() => navigate('/campos-captura'));

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getCaptureFieldById', id],
        queryFn: () => captureFieldsProvider.getCaptureFieldById(id!),
        retry: false
    });

    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                    <Title title={data.label} subtitle="Campo del catálogo de captura" />
                    <CaptureFieldTags field={data} showScope />
                </div>

                <div className="flex gap-3">
                    {canEditCaptureField(data) && (
                        <CustomFilledButton
                            label="Editar"
                            type="button"
                            icon={<EditIcon className="size-4" />}
                            onClick={() => navigate(`/campos-captura/${data.id}/editar`)}
                        />
                    )}
                    {canDeleteCaptureField(data) && (
                        <CustomFilledButton
                            label="Eliminar"
                            type="button"
                            icon={<Trash2Icon className="size-4" />}
                            disabled={isDeleting}
                            onClick={() => handleDeleteCaptureField(data)}
                        />
                    )}
                </div>
            </div>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 rounded-xl border border-line bg-surface px-5 py-4 sm:grid-cols-4">
                <InformationField label="Clave" value={data.key} mono />
                <InformationField label="Tipo de dato" value={captureFieldDataTypeLabels[data.data_type]} />
                <InformationField label="Familia" value={captureFieldScopeLabel(data)} />
                <InformationField label="Uso" value={data.is_assigned ? 'Asignado a líneas' : 'Sin asignar'} />
            </dl>

            {data.is_system && (
                <p className="text-sm text-ink-muted">
                    Es un campo de sistema: no se edita ni se elimina, pero puedes asignarlo, reordenarlo y renombrarlo en cada línea.
                </p>
            )}

            {data.data_type === 'select' && (
                <CaptureFieldValueList title="Opciones" values={data.options ?? []} emptyMessage="Sin opciones registradas" />
            )}

            {data.is_calculated && (
                <CaptureFieldValueList title="Se calcula con" values={data.depends_on} emptyMessage="Sin dependencias" mono />
            )}
        </div>
    )
}
