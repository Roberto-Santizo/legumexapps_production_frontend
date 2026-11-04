import { getQueryParam, handleDeleteQueryParam, Modal, queryParamExists } from "@/features/shared/shared";
import { lineFieldsSignature, type LineCaptureFormValues } from "@/features/line-fields/line-fields";
import { defaultRecordFormValues, getCaptureBlocker, getNextPalletNumber, getPoundsPerBox, PerformanceRecordCaptureForm, PerformanceRecordEstimate, PerformanceRecordTaskNotice, PerformanceRecordTaskSummary, performanceRecordsQueryKey, toRecordValues, useCreateWeeklyPlanTaskPerformanceRecord, usePalletCaptureFields, weeklyPlanTaskPerformanceRecordProvider, weeklyPlanTaskQueryKey, type PerformanceRecordFormErrors } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function ModalCreateWeeklyPlanTaskPerformanceRecord() {
    const location = useLocation();
    const navigate = useNavigate();
    const taskId = getQueryParam(location, 'taskPerformance') ?? '';
    const show = queryParamExists(location, 'taskPerformance');
    const [formErrors, setFormErrors] = useState<PerformanceRecordFormErrors | null>(null);

    const closeModal = () => {
        setFormErrors(null);
        handleDeleteQueryParam(location, navigate, 'taskPerformance');
    };

    const { data: task, isLoading, error } = useQuery({
        queryKey: weeklyPlanTaskQueryKey(taskId),
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(taskId),
        enabled: show,
        retry: false
    });

    const { data: records, isLoading: isLoadingRecords } = useQuery({
        queryKey: performanceRecordsQueryKey(taskId),
        queryFn: () => weeklyPlanTaskPerformanceRecordProvider.getWeeklyPlanTaskPerformanceRecords(taskId),
        enabled: show,
        retry: false
    });

    const capture = usePalletCaptureFields(task?.line_code ?? '', show);

    const { createRecord, isCreating } = useCreateWeeklyPlanTaskPerformanceRecord({
        weeklyPlanTaskId: taskId,
        onSuccess: closeModal,
        onFormErrors: setFormErrors
    });

    const nextPalletNumber = records ? getNextPalletNumber(records) : null;
    const hasPalletField = capture.inputFields.some(field => field.key === 'pallet_number');
    const loading = isLoading || isLoadingRecords || capture.isLoading;
    const loadError = error ?? capture.error;

    const blocker = task ? getCaptureBlocker({
        captureType: 'pallet',
        status: task.status,
        lineName: task.line_name,
        isCaptureLine: capture.isCaptureLine,
        inputFieldsCount: capture.inputFields.length
    }, 'register') : null;

    const onSubmit = (values: LineCaptureFormValues) => {
        setFormErrors(null);
        createRecord(toRecordValues(capture.inputFields, values));
    };

    return (
        <Modal modal={show} closeModal={closeModal} title="Registrar tarima" width="sm:max-w-2xl">
            {loading && (
                <div className="h-40 animate-pulse rounded-xl bg-canvas motion-reduce:animate-none" />
            )}

            {!loading && loadError && (
                <PerformanceRecordTaskNotice title="No se pudo cargar la captura" message={loadError.message} />
            )}

            {!loading && !loadError && task && blocker && (
                <PerformanceRecordTaskNotice title={blocker.title} message={blocker.message} />
            )}

            {!loading && !loadError && task && !blocker && (
                <div className="space-y-5">
                    <PerformanceRecordTaskSummary task={task} nextPalletNumber={hasPalletField ? nextPalletNumber : undefined} />

                    <PerformanceRecordCaptureForm
                        key={`${nextPalletNumber}-${lineFieldsSignature(capture.fields)}`}
                        fields={capture.inputFields}
                        defaultValues={defaultRecordFormValues(capture.inputFields, nextPalletNumber)}
                        formErrors={formErrors}
                        submitLabel="Registrar tarima"
                        isPending={isCreating}
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
