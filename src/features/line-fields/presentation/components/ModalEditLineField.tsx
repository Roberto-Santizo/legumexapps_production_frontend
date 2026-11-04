import { CustomFilledButton, CustomForm, getQueryParam, handleDeleteQueryParam, Modal, queryParamExists } from "@/features/shared/shared";
import { LineFieldFormComponent, toLineFieldForm, toUpdateLineFieldPayload, useUpdateLineField, type LineField, type LineFieldForm } from "@/features/line-fields/line-fields";
import { RotateCcwIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    lineCode: string;
    fields: LineField[];
}

export function ModalEditLineField({ lineCode, fields }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const fieldId = getQueryParam(location, 'editLineField') ?? '';
    const show = queryParamExists(location, 'editLineField');
    const field = fields.find(item => `${item.id}` === fieldId) ?? null;

    const closeModal = () => handleDeleteQueryParam(location, navigate, 'editLineField');

    const { updateField, isUpdating } = useUpdateLineField({ lineCode, onSuccess: closeModal });

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<LineFieldForm>();

    useEffect(() => {
        if (show && field) reset(toLineFieldForm(field));
    }, [show, field, reset]);

    const onSubmit = (form: LineFieldForm) => {
        if (field) updateField(field.id, toUpdateLineFieldPayload(form, field));
    };

    return (
        <Modal modal={show && Boolean(field)} closeModal={closeModal} title="Editar campo de la línea" width="sm:max-w-lg">
            {field && (
                <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3">
                        <div className="min-w-0">
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">Campo del catálogo</p>
                            <p className="mt-0.5 truncate text-sm text-ink">{field.field_label} <span className="font-mono text-xs text-ink-subtle">· {field.key}</span></p>
                        </div>

                        {field.custom_label && (
                            <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => updateField(field.id, { label: null })}
                                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-ink disabled:opacity-40"
                            >
                                <RotateCcwIcon className="size-3.5" />
                                Restablecer etiqueta
                            </button>
                        )}
                    </div>

                    <CustomForm onSubmit={handleSubmit(onSubmit)} className="border-none p-0 shadow-none">
                        <LineFieldFormComponent field={field} register={register} errors={errors} />
                        <CustomFilledButton type="submit" label="Guardar cambios" disabled={isUpdating} fullWitdh />
                    </CustomForm>
                </div>
            )}
        </Modal>
    )
}
