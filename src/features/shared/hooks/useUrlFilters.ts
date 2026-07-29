import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { UseUrlFiltersProps } from "@/features/shared/shared";

export function useUrlFilters<T extends Record<string, unknown>>({ schema, defaults }: UseUrlFiltersProps<T>) {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo(() => {
        const values = Object.fromEntries(searchParams.entries());

        return schema.parse({
            ...defaults,
            ...values,
        });
    }, [searchParams, schema, defaults]);

    const setFilters = useCallback(
        (values: Partial<T>) => {
            const parsed = schema.parse({
                ...defaults,
                ...values,
            });

            setSearchParams(prev => {
                const params = new URLSearchParams(prev);

                Object.entries(parsed).forEach(([key, value]) => {
                    params.set(key, String(value));
                });

                params.set('page', '0');
                return params;
            });
        },
        [schema, defaults, setSearchParams],
    );

    const clearFilters = useCallback(() => {
        setFilters(defaults);
    }, [setFilters, defaults]);

    return {
        filters,
        setFilters,
        clearFilters,
    };
}