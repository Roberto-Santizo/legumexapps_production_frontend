import { getQueryParam, handleDeleteQueryParam, InformationField, Modal, queryParamExists, useNotification } from "@/features/shared/shared";
import { lineFieldsSignature, type LineCaptureFormValues } from "@/features/line-fields/line-fields";
import { changedRecordValues, getCaptureBlocker, getPoundsPerBox, PerformanceRecordCaptureForm, PerformanceRecordEstimate, PerformanceRecordTaskNotice, performanceRecordQueryKey, toRecordFormValues, usePalletCaptureFields, useUpdateWeeklyPlanTaskPerformanceRecord, weeklyPlanTaskPerformanceRecordProvider, weeklyPlanTaskQueryKey, type PerformanceRecordFormErrors } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function ModalUpdateWeeklyPlanTaskPerformanceRecord() {
    const location = useLocation();
    const navigate = useNavigate();
    const notification = useNotification();
    const recordId = getQueryParam(location, 'editPerformanceRecord') ?? '';
    const show = queryParamExists(location, 'editPerformanceRecord');
    const [formErrors, setFormErrors] = useState<PerformanceRecordFormErrors | null>(null);

    const closeModal = () => {
        setFormErrors(null);
        handleDeleteQueryParam(location, navigate, 'editPerformanceRecord');
    };

    const { data: record, isLoading, error } = useQuery({
        queryKey: performanceRecordQueryKey(recordId),
        queryFn: () => weeklyPlanTaskPerformanceRecordProvider.getWeeklyPlanTaskPerformanceRecordById(recordId),
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

    const capture = usePalletCaptureFields(task?.line_code ?? '', show);

    const { updateRecord, isUpdating } = useUpdateWeeklyPlanTaskPerformanceRecord({
        recordId,
        weeklyPlanTaskId: taskId,
        onSuccess: closeModal,
        onFormErrors: setFormErrors
    });

    const loading = isLoading || isLoadingTask || capture.isLoading;
    const loadError = error ?? taskError ?? capture.error;

    const blocker = task ? getCaptureBlocker({
        captureType: 'pallet',
        status: task.status,
        lineName: task.line_name,
        isCaptureLine: capture.isCaptureLine,
        inputFieldsCount: capture.inputFields.length
    }, 'edit') : null;

    const onSubmit = (values: LineCaptureFormValues) => {
        if (!record) return;

        const changes = changedRecordValues(capture.inputFields, record, values);

        if (Object.keys(changes).length === 0) {
            notification.information('No hay cambios para guardar');
            return;
        }

        setFormErrors(null);
        updateRecord(changes);
    };

    return (
        <Modal modal={show} closeModal={closeModal} title="Editar tarima" width="sm:max-w-2xl">
            {loading && (
                <div className="h-40 animate-pulse rounded-xl bg-canvas motion-reduce:animate-none" />
            )}

            {!loading && loadError && (
                <PerformanceRecordTaskNotice title="No se pudo cargar la tarima" message={loadError.message} />
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
                        defaultValues={toRecordFormValues(capture.inputFields, record)}
                        formErrors={formErrors}
                        submitLabel="Guardar cambios"
                        isPending={isUpdating}
                        onSubmit={onSubmit}
                        renderEstimate={(control) => (
                            <PerformanceRecordEstimate control={control} calculatedFields={capture.calculatedFields} poundsPerBox={getPoundsPerBox(task.planned_pounds, task.boxes)} />
                        )}
                    />
                </div>
            )}
        </Modal>
    )
}
