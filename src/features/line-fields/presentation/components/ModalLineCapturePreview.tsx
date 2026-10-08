import { Modal, useNotification } from "@/features/shared/shared";
import { LineCaptureForm, lineFieldsSignature, type LineField } from "@/features/line-fields/line-fields";

type Props = {
    open: boolean;
    close: () => void;
    fields: LineField[];
}

export function ModalLineCapturePreview({ open, close, fields }: Props) {
    const notification = useNotification();

    return (
        <Modal modal={open} closeModal={close} title="Vista previa del formulario de captura">
            <p className="mb-5 text-sm text-ink-muted">
                Así verá el personal el formulario de esta línea. Puedes probar las validaciones; no se guarda ningún registro.
            </p>

            <LineCaptureForm
                key={lineFieldsSignature(fields)}
                fields={fields}
                submitLabel="Validar formulario"
                className="border-none p-0 shadow-none"
                onSubmit={() => notification.information('Los datos cumplen las reglas del formulario')}
            />
        </Modal>
    )
}
