import { getQueryParam, handleDeleteQueryParam, InformationField, Modal, queryParamExists, useNotification } from "@/features/shared/shared";
import { lineFieldsSignature, type LineCaptureFormValues } from "@/features/line-fields/line-fields";
import { getCaptureBlocker, PerformanceRecordCaptureForm, PerformanceRecordTaskNotice, toRecordValues, weeklyPlanTaskQueryKey, type PerformanceRecordFormErrors } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { changedProductRecordValues, ProductRecordEstimate, productRecordQueryKey, toProductRecordFormValues, useProductCaptureFields, useUpdateWeeklyPlanTaskProductRecord, validateProductRecordRules, weeklyPlanTaskProductRecordProvider } from "@/features/weekly-plan-task-product-records/weekly-plan-task-product-records";
import { weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function ModalUpdateWeeklyPlanTaskProductRecord() {
    const location = useLocation();
    const navigate = useNavigate();
    const notification = useNotification();
    const recordId = getQueryParam(location, 'editProductRecord') ?? '';
    const show = queryParamExists(location, 'editProductRecord');
    const [formErrors, setFormErrors] = useState<PerformanceRecordFormErrors | null>(null);

    const closeModal = () => {
        setFormErrors(null);
        handleDeleteQueryParam(location, navigate, 'editProductRecord');
    };

    const { data: record, isLoading, error } = useQuery({
        queryKey: productRecordQueryKey(recordId),
        queryFn: () => weeklyPlanTaskProductRecordProvider.getWeeklyPlanTaskProductRecordById(recordId),
        enabled: show,
        retry: false
    });

    const taskId = record ? String(record.weekly_plan_task_id) : '';

    const { data: task, isLoading: isLoadingTask, error: taskError } = useQuery({
        queryKey: weeklyPlanTaskQueryKey(taskId),
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(taskId),
        enabled: show && !!record,
        retry: false
    });

    const capture = useProductCaptureFields(task?.line_code ?? '', show);

    const { updateRecord, isUpdating } = useUpdateWeeklyPlanTaskProductRecord({
        recordId,
        weeklyPlanTaskId: taskId,
        onSuccess: closeModal,
        onFormErrors: setFormErrors
    });

    const loading = isLoading || isLoadingTask || capture.isLoading;
    const loadError = error ?? taskError ?? capture.error;

    const blocker = task ? getCaptureBlocker({
        captureType: 'product',
        status: task.status,
        lineName: task.line_name,
        isCaptureLine: capture.isCaptureLine,
        inputFieldsCount: capture.inputFields.length
    }, 'edit') : null;

    const onSubmit = (values: LineCaptureFormValues) => {
        if (!record) return;

        const ruleErrors = validateProductRecordRules(toRecordValues(capture.inputFields, values));
        setFormErrors(ruleErrors);
        if (ruleErrors) return;

        const changes = changedProductRecordValues(capture.inputFields, record, values);

        if (Object.keys(changes).length === 0) {
            notification.information('No hay cambios para guardar');
            return;
        }

        updateRecord(changes);
    };

    return (
        <Modal modal={show} closeModal={closeModal} title="Editar producto" width="sm:max-w-2xl">
            {loading && (
                <div className="h-40 animate-pulse rounded-xl bg-canvas motion-reduce:animate-none" />
            )}

            {!loading && loadError && (
                <PerformanceRecordTaskNotice title="No se pudo cargar el producto" message={loadError.message} />
            )}

            {!loading && !loadError && record && task && blocker && (
                <PerformanceRecordTaskNotice title={blocker.title} message={blocker.message} />
            )}

            {!loading && !loadError && record && task && !blocker && (
                <div className="space-y-5">
                    <dl className="grid grid-cols-2 gap-x-8 gap-y-3 rounded-xl border border-line bg-surface px-5 py-4">
                        <InformationField label="Registró" value={record.user_name} />
                        <InformationField label="Fecha" value={record.created_at} mono />
                    </dl>

                    <PerformanceRecordCaptureForm
                        key={`${record.id}-${record.updated_at}-${lineFieldsSignature(capture.fields)}`}
                        fields={capture.inputFields}
                        defaultValues={toProductRecordFormValues(capture.inputFields, record)}
                        formErrors={formErrors}
                        submitLabel="Guardar cambios"
                        isPending={isUpdating}
                        onSubmit={onSubmit}
                        renderEstimate={(control) => (
                            <ProductRecordEstimate control={control} calculatedFields={capture.calculatedFields} />
                        )}
                    />
                </div>
            )}
        </Modal>
    )
}
