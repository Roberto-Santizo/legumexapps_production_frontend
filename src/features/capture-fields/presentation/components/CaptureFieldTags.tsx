import { CaptureFieldTag, captureFieldDataTypeLabels, captureTypeLabels, type CaptureField } from "@/features/capture-fields/capture-fields";
import { LockIcon, SigmaIcon } from "lucide-react";

type Props = {
    field: Pick<CaptureField, 'data_type' | 'is_system' | 'is_calculated'> & { capture_type?: CaptureField['capture_type'] };
    showScope?: boolean;
}

export function CaptureFieldTags({ field, showScope = false }: Props) {
    return (
        <div className="flex flex-wrap items-center gap-1.5">
            <CaptureFieldTag>{captureFieldDataTypeLabels[field.data_type]}</CaptureFieldTag>

            {field.is_calculated && (
                <CaptureFieldTag tone="solid" icon={<SigmaIcon />} title="Lo calcula el sistema; se muestra como solo lectura">
                    Calculado
                </CaptureFieldTag>
            )}

            {showScope && (
                <CaptureFieldTag tone="muted">
                    {field.capture_type ? captureTypeLabels[field.capture_type] : 'Global'}
                </CaptureFieldTag>
            )}

            {field.is_system && (
                <CaptureFieldTag tone="muted" icon={<LockIcon />} title="Campo de sistema: no se edita ni se elimina">
                    Sistema
                </CaptureFieldTag>
            )}
        </div>
    )
}
