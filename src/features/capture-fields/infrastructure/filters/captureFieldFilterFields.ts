import type { FilterField } from "@/features/shared/shared";
import type { CaptureFieldFilters } from "./captureFieldFilterSchema";
import { captureFieldOriginOptions, captureTypeOptions } from "../utils/captureFieldLabels";

export const captureFieldFilterFields: FilterField<CaptureFieldFilters>[] = [
    { name: 'captureType', label: 'Familia de captura', type: 'select', options: captureTypeOptions },
    { name: 'isSystem', label: 'Origen', type: 'select', options: captureFieldOriginOptions }
];
