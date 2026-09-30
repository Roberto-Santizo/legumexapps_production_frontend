import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangleIcon, DownloadIcon } from "lucide-react";
import { CustomFilledButton, downloadExcelTemplate, FileFormField, Modal, useNotification, type BulkUploadColumn, type BulkUploadForm } from "@/features/shared/shared";

type Props = {
    modal: boolean;
    closeModal: () => void;
    title: string;
    templateName: string;
    columns: BulkUploadColumn[];
    upload: (file: File) => Promise<string>;
    onSuccess: () => void;
    note?: string;
}

type RowError = {
    row: string | null;
    message: string;
}

const parseRowErrors = (message: string): RowError[] =>
    message
        .split(/\r?\n/)
        .filter(line => line.trim() !== '')
        .map(line => {
            const match = line.match(/^Línea\s+(\d+):\s*(.*)$/);
            return match ? { row: match[1], message: match[2] } : { row: null, message: line };
        });

export function BulkUploadModal({ modal, closeModal, title, templateName, columns, upload, onSuccess, note }: Props) {
    const notification = useNotification();
    const [rowErrors, setRowErrors] = useState<RowError[]>([]);
    const hasOptional = columns.some(column => column.optional);

    const { handleSubmit, control, reset } = useForm<BulkUploadForm>({ defaultValues: { file: null } });

    const handleClose = () => {
        reset();
        setRowErrors([]);
        closeModal();
    }

    const { mutate, isPending } = useMutation({
        mutationFn: (file: File) => upload(file),
        onSuccess: (message) => {
            notification.success(message);
            onSuccess();
            handleClose();
        },
        onError: (err) => {
            const errors = parseRowErrors(err.message ?? '');
            const hasRowErrors = errors.some(error => error.row !== null);

            if (hasRowErrors) {
                setRowErrors(errors);
                notification.error(`El archivo tiene ${errors.length} ${errors.length === 1 ? 'error' : 'errores'}. No se guardó ningún registro.`);
                return;
            }

            setRowErrors([]);
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: BulkUploadForm) => {
        if (!payload.file) return;
        setRowErrors([]);
        mutate(payload.file);
    }

    return (
        <Modal modal={modal} closeModal={handleClose} title={title}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
                <section className="space-y-3">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h3 className="text-sm font-semibold text-ink">Columnas del archivo</h3>
                            <p className="mt-0.5 text-xs text-ink-muted">
                                Fila 1 como encabezado. Los datos empiezan en la fila 2 de la primera hoja.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => downloadExcelTemplate(templateName, columns.map(column => column.header))}
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-line-strong hover:bg-canvas cursor-pointer focus:outline-none focus:ring-2 focus:ring-ink/10"
                        >
                            <DownloadIcon className="size-3.5" />
                            Descargar plantilla
                        </button>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-line">
                        <table className="w-full border-collapse font-mono text-xs">
                            <thead>
                                <tr className="bg-canvas">
                                    <th className="w-8 border-r border-line px-2 py-1.5 text-center font-normal text-ink-subtle">1</th>
                                    {columns.map(column => (
                                        <th key={column.header} className="border-r border-line px-3 py-1.5 text-left font-semibold text-ink last:border-r-0 whitespace-nowrap">
                                            {column.header}
                                            {column.optional && <span className="ml-1.5 font-sans text-[10px] font-normal uppercase tracking-wide text-ink-subtle">opcional</span>}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-line">
                                    <td className="border-r border-line px-2 py-1.5 text-center text-ink-subtle">2</td>
                                    {columns.map(column => (
                                        <td key={column.header} className="border-r border-line px-3 py-1.5 align-top font-sans text-ink-muted last:border-r-0">
                                            {column.description}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <ul className="space-y-1 text-xs text-ink-muted">
                        <li>{hasOptional ? 'Las columnas sin marca de opcional son obligatorias en cada fila.' : 'Todas las columnas son obligatorias en cada fila.'} Borra las filas vacías antes de subir.</li>
                        <li>Si una fila falla no se guarda ninguna. Corrige el archivo y súbelo completo otra vez.</li>
                        {note && <li>{note}</li>}
                    </ul>
                </section>

                <FileFormField<BulkUploadForm>
                    name="file"
                    control={control}
                    accept={{
                        "application/vnd.ms-excel": [".xls"],
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
                    }}
                    validation={{ required: 'Selecciona un archivo .xls o .xlsx' }}
                />

                {rowErrors.length > 0 && (
                    <section className="overflow-hidden rounded-lg border border-red-200 bg-red-50/60">
                        <div className="flex items-center gap-2 border-b border-red-200 px-4 py-2.5">
                            <AlertTriangleIcon className="size-4 text-red-600" />
                            <p className="text-sm font-semibold text-red-700">
                                {rowErrors.length} {rowErrors.length === 1 ? 'error encontrado' : 'errores encontrados'}
                            </p>
                        </div>

                        <ul className="max-h-60 divide-y divide-red-100 overflow-y-auto">
                            {rowErrors.map((error, index) => (
                                <li key={`${error.row}-${index}`} className="flex items-start gap-3 px-4 py-2 text-xs">
                                    <span className="shrink-0 rounded bg-red-100 px-1.5 py-0.5 font-mono font-semibold text-red-700">
                                        {error.row ? `Fila ${error.row}` : '—'}
                                    </span>
                                    <span className="pt-0.5 text-red-800">{error.message}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <CustomFilledButton
                    label="Subir archivo"
                    type="submit"
                    disabled={isPending}
                    fullWitdh
                />
            </form>
        </Modal>
    )
}
