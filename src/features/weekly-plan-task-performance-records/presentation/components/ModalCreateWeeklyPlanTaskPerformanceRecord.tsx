import { CustomFilledButton, CustomForm, getQueryParam, handleDeleteQueryParam, Modal, queryParamExists } from "@/features/shared/shared";
import { getNextPalletNumber, getPoundsPerBox, PerformanceRecordEstimate, PerformanceRecordTaskNotice, PerformanceRecordTaskSummary, performanceRecordsQueryKey, useCreateWeeklyPlanTaskPerformanceRecord, weeklyPlanTaskPerformanceRecordProvider, weeklyPlanTaskQueryKey, WeeklyPlanTaskPerformanceRecordFormComponent, type WeeklyPlanTaskPerformanceRecordForm } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export function ModalCreateWeeklyPlanTaskPerformanceRecord() {
    const location = useLocation();
    const navigate = useNavigate();
    const taskId = getQueryParam(location, 'taskPerformance') ?? '';
    const show = queryParamExists(location, 'taskPerformance');

    const closeModal = () => handleDeleteQueryParam(location, navigate, 'taskPerformance');

    const { data: task, isLoading, isError, error } = useQuery({
        queryKey: weeklyPlanTaskQueryKey(taskId),
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(taskId),
        enabled: show,
        retry: false
    });

    const { data: records } = useQuery({
        queryKey: performanceRecordsQueryKey(taskId),
        queryFn: () => weeklyPlanTaskPerformanceRecordProvider.getWeeklyPlanTaskPerformanceRecords(taskId),
        enabled: show,
        retry: false
    });

    const {
        handleSubmit,
        register,
        reset,
        control,
        setError,
        formState: { errors }
    } = useForm<WeeklyPlanTaskPerformanceRecordForm>();

    const nextPalletNumber = records ? getNextPalletNumber(records) : null;

    useEffect(() => {
        if (show) reset({ pallet_number: nextPalletNumber, boxes: null });
    }, [show, nextPalletNumber, reset]);

    const { createRecord, isCreating } = useCreateWeeklyPlanTaskPerformanceRecord({
        weeklyPlanTaskId: taskId,
        onSuccess: closeModal,
        onDuplicatePallet: (message) => setError('pallet_number', { message })
    });

    const onSubmit = (form: WeeklyPlanTaskPerformanceRecordForm) => createRecord(form);

    return (
        <Modal modal={show} closeModal={closeModal} title="Registrar toma de rendimiento" width="sm:max-w-lg">
            {isLoading && (
                <div className="h-40 animate-pulse rounded-xl bg-canvas motion-reduce:animate-none" />
            )}

            {isError && (
                <PerformanceRecordTaskNotice title="No se pudo cargar la tarea" message={error.message} />
            )}

            {task && task.status !== 4 && (
                <PerformanceRecordTaskNotice
                    title="La tarea no está en progreso"
                    message="Solo se registran tomas de rendimiento mientras la tarea está en progreso."
                />
            )}

            {task && task.status === 4 && (
                <div className="space-y-5">
                    <PerformanceRecordTaskSummary task={task} nextPalletNumber={nextPalletNumber} />

                    <CustomForm onSubmit={handleSubmit(onSubmit)} className="border-none p-0 shadow-none">
                        <WeeklyPlanTaskPerformanceRecordFormComponent register={register} errors={errors} />

                        <PerformanceRecordEstimate control={control} poundsPerBox={getPoundsPerBox(task.planned_pounds, task.boxes)} />

                        <CustomFilledButton type="submit" label="Registrar toma" disabled={isCreating} fullWitdh />
                    </CustomForm>
                </div>
            )}
        </Modal>
    )
}
