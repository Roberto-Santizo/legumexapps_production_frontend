import { useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { PerformanceRecordValidationError, splitPerformanceRecordErrors, type PerformanceRecordFormErrors } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { isLineWithoutFieldsError } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";
import { getProductRuleErrorField, invalidateProductRecordQueries, isProductTaskNotInProgressError } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";

export function useProductRecordErrorHandler(weeklyPlanTaskId: string, onFormErrors?: (errors: PerformanceRecordFormErrors) => void) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    return (error: Error) => {
        if (onFormErrors && error instanceof PerformanceRecordValidationError) {
            onFormErrors(splitPerformanceRecordErrors(error.errors));
            return;
        }

        const ruleField = getProductRuleErrorField(error.message);

        if (onFormErrors && ruleField) {
            onFormErrors({ byField: { [ruleField]: error.message }, general: [] });
            return;
        }

        if (onFormErrors && isLineWithoutFieldsError(error.message)) {
            onFormErrors({ byField: {}, general: [`${error.message}. Configura los campos de captura de la línea para registrar productos.`] });
            return;
        }

        notification.error(error.message);

        if (isProductTaskNotInProgressError(error.message)) invalidateProductRecordQueries(queryClient, weeklyPlanTaskId);
    };
}
