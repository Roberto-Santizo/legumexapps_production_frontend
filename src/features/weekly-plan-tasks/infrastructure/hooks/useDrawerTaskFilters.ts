import { useEffect, useState } from "react";
import { useWeeklyPlanTaskFilters } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

export function useDrawerTaskFilters(onFiltersChange: () => void) {
    const { filters, setFilters, clearFilters } = useWeeklyPlanTaskFilters();
    const [skuSearch, setSkuSearch] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            const skuCode = skuSearch.trim();
            if (skuCode === filters.skuCode) return;
            setFilters({ skuCode });
            onFiltersChange();
        }, 400);

        return () => clearTimeout(timeout);
    }, [skuSearch, filters.skuCode, setFilters, onFiltersChange]);

    const hasFilters = filters.lineId !== '' || skuSearch !== '';

    const handleLineChange = (lineId: string) => {
        setFilters({ lineId });
        onFiltersChange();
    }

    const handleClearFilters = () => {
        setSkuSearch('');
        clearFilters();
        onFiltersChange();
    }

    return { filters, skuSearch, setSkuSearch, hasFilters, handleLineChange, handleClearFilters };
}
