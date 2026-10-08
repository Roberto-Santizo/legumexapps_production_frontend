import { defaultCaptureFieldFilters } from "./defaultCaptureFieldFilters";
import { CaptureFieldFiltersSchema } from "./captureFieldFilterSchema";
import { useUrlFilters } from "@/features/shared/hooks/useUrlFilters";

export function useCaptureFieldFilters() {
    return useUrlFilters({
        schema: CaptureFieldFiltersSchema,
        defaults: defaultCaptureFieldFilters
    });
}
