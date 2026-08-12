import { useCallback, useState } from "react";
import type { UseFiltersProps } from "@/features/shared/shared";

export function useFilters<T extends Record<string, unknown>>({ schema, defaults }: UseFiltersProps<T>) {
    const [filters, setState] = useState<T>(() => schema.parse(defaults));

    const setFilters = useCallback(
        (values: Partial<T>) => {
            setState(prev => schema.parse({ ...prev, ...values }));
        },
        [schema],
    );

    const clearFilters = useCallback(() => { setState(schema.parse(defaults)); }, [schema, defaults]);

    return { filters, setFilters, clearFilters };
}
