import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { buildPreviousDistribution, getPreviousConfigurationMessage, getPreviousConfigurationWarning, weeklyPlanTaskEmployeeProvider, type PreviousDistributionSources, type PreviousEmployee, type StaffDistribution } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    lineSkuId: number;
    sources: PreviousDistributionSources;
    onLoad: (distribution: StaffDistribution) => void;
}

export function useLoadPreviousConfiguration({ lineSkuId, sources, onLoad }: Props) {
    const notification = useNotification();
    const [unavailable, setUnavailable] = useState<PreviousEmployee[]>([]);

    const { mutate, isPending } = useMutation({
        mutationFn: () => weeklyPlanTaskEmployeeProvider.getLastEmployeesConfigurationByLineSkuId(lineSkuId),
        onSuccess: ({ employees }) => {
            const distribution = buildPreviousDistribution(employees, sources);
            setUnavailable(distribution.unavailable);

            if (distribution.placedCount === 0) {
                notification.warning(getPreviousConfigurationWarning(employees.length));
                return;
            }

            onLoad(distribution);
            notification.success(getPreviousConfigurationMessage(distribution));
        },
        onError: (err) => notification.error(err.message)
    });

    return { load: () => mutate(), isPending, unavailable, clearUnavailable: () => setUnavailable([]) };
}
