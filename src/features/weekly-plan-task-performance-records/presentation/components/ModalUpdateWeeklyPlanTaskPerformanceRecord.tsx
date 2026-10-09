import { CustomFilledButton, CustomForm, getQueryParam, handleDeleteQueryParam, InformationField, Modal, queryParamExists } from "@/features/shared/shared";
import { getPoundsPerBox, PerformanceRecordEstimate, PerformanceRecordTaskNotice, performanceRecordQueryKey, useUpdateWeeklyPlanTaskPerformanceRecord, weeklyPlanTaskPerformanceRecordProvider, weeklyPlanTaskQueryKey, WeeklyPlanTaskPerformanceRecordFormComponent, type WeeklyPlanTaskPerformanceRecordForm } from "@/features/weekly-plan-task-performance-records/weekly-plan-task-performance-records";
import { weeklyPlanTaskProvider } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export function ModalUpdateWeeklyPlanTaskPerformanceRecord() {
    const location = useLocation();
    const navigate = useNavigate();
    const recordId = getQueryParam(location, 'editPerformanceRecord') ?? '';
    const show = queryParamExists(location, 'editPerformanceRecord');

    const closeModal = () => handleDeleteQueryParam(location, navigate, 'editPerformanceRecord');

    const { data: record, isLoading, isError, error } = useQuery({
        queryKey: performanceRecordQueryKey(recordId),
        queryFn: () => weeklyPlanTaskPerformanceRecordProvider.getWeeklyPlanTaskPerformanceRecordById(recordId),
        enabled: show,
        retry: false
    });

    const taskId = record ? String(record.weekly_plan_task_id) : '';

    const { data: task } = useQuery({
        queryKey: weeklyPlanTaskQueryKey(taskId),
        queryFn: () => weeklyPlanTaskProvider.getWeeklyPlanTaskById(taskId),
        enabled: show && !!record,
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

    useEffect(() => {
        if (show && record) {
            const { pallet_number, boxes, net_weight } = record;
            reset({ pallet_number, boxes, weighed_pounds: net_weight ?? 0 });
        }
    }, [show, record, reset]);

    const { updateRecord, isUpdating } = useUpdateWeeklyPlanTaskPerformanceRecord({
        recordId,
        weeklyPlanTaskId: taskId,
        onSuccess: closeModal,
        onDuplicatePallet: (message) => setError('pallet_number', { message })
    });

    const onSubmit = (form: WeeklyPlanTaskPerformanceRecordForm) => updateRecord(form);

    return (
        <Modal modal={show} closeModal={closeModal} title="Editar toma de rendimiento" width="sm:max-w-lg">
            {isLoading && (
                <div className="h-40 animate-pulse rounded-xl bg-canvas motion-reduce:animate-none" />
            )}

            {isError && (
                <PerformanceRecordTaskNotice title="No se pudo cargar la toma" message={error.message} />
            )}

            {record && task && task.status !== 4 && (
                <PerformanceRecordTaskNotice
                    title="La tarea no está en progreso"
                    message="Las tomas de rendimiento solo se corrigen mientras la tarea está en progreso."
                />
            )}

            {record && task && task.status === 4 && (
                <div className="space-y-5">
                    <dl className="grid grid-cols-2 gap-x-8 gap-y-3 rounded-xl border border-line bg-surface px-5 py-4">
                        <InformationField label="Registró" value={record.user_name} />
                        <InformationField label="Fecha" value={record.created_at} mono />
                    </dl>

                    <CustomForm onSubmit={handleSubmit(onSubmit)} className="border-none p-0 shadow-none">
                        <WeeklyPlanTaskPerformanceRecordFormComponent register={register} errors={errors} />

                        <PerformanceRecordEstimate control={control} poundsPerBox={getPoundsPerBox(task.planned_pounds, task.boxes)} />

                        <CustomFilledButton type="submit" label="Guardar cambios" disabled={isUpdating} fullWitdh />
                    </CustomForm>
                </div>
            )}
        </Modal>
    )
}
