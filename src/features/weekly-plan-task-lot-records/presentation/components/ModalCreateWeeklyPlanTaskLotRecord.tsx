import { getQueryParam, handleDeleteQueryParam, Modal, queryParamExists } from "@/features/shared/shared";
import { lineFieldsSignature, type LineCaptureFormValues } from "@/features/line-fields/line-fields";
import { getCaptureBlocker, PerformanceRecordCaptureForm, PerformanceRecordTaskNotice, PerformanceRecordTaskSummary, toRecordValues, weeklyPlanTaskQueryKey, type PerformanceRecordFormErrors } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { defaultLotRecordFormValues, LotRecordEstimate, useCreateWeeklyPlanTaskLotRecord, useLotCaptureFields, validateLotRecordRules } from "@/features/weekly-plan-task-lot-records/weekly-plan-task-lot-records";
import { weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function ModalCreateWeeklyPlanTaskLotRecord() {
    const location = useLocation();
    const navigate = useNavigate();
    const taskId = getQueryParam(location, 'taskLots') ?? '';
    const show = queryParamExists(location, 'taskLots');
    const [formErrors, setFormErrors] = useState<PerformanceRecordFormErrors | null>(null);

    const closeModal = () => {
        setFormErrors(null);
        handleDeleteQueryParam(location, navigate, 'taskLots');
    };

    const { data: task, isLoading, error } = useQuery({
        queryKey: weeklyPlanTaskQueryKey(taskId),
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(taskId),
        enabled: show,
        retry: false
    });

    const capture = useLotCaptureFields(task?.line_code ?? '', show);

    const { createRecord, isCreating } = useCreateWeeklyPlanTaskLotRecord({
        weeklyPlanTaskId: taskId,
        onSuccess: closeModal,
        onFormErrors: setFormErrors
    });

    const loading = isLoading || capture.isLoading;
    const loadError = error ?? capture.error;

    const blocker = task ? getCaptureBlocker({
        captureType: 'lot',
        status: task.status,
        lineName: task.line_name,
        isCaptureLine: capture.isCaptureLine,
        inputFieldsCount: capture.inputFields.length
    }, 'register') : null;

    const onSubmit = (formValues: LineCaptureFormValues) => {
        const values = toRecordValues(capture.inputFields, formValues);
        const ruleErrors = validateLotRecordRules(values);

        setFormErrors(ruleErrors);
        if (!ruleErrors) createRecord(values);
    };

    return (
        <Modal modal={show} closeModal={closeModal} title="Registrar lote" width="sm:max-w-2xl">
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
                    <PerformanceRecordTaskSummary task={task} progressLabel="Libras recortadas" />

                    <PerformanceRecordCaptureForm
                        key={lineFieldsSignature(capture.fields)}
                        fields={capture.inputFields}
                        defaultValues={defaultLotRecordFormValues(capture.inputFields)}
                        formErrors={formErrors}
                        submitLabel="Registrar lote"
                        isPending={isCreating}
                        onSubmit={onSubmit}
                        renderEstimate={(control) => (
                            <LotRecordEstimate control={control} calculatedFields={capture.calculatedFields} />
                        )}
                    />
                </div>
            )}
        </Modal>
    )
}
