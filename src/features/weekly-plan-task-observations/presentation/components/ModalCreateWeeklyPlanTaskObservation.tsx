import { CustomFilledButton, CustomForm, getQueryParam, handleDeleteQueryParam, Modal, queryParamExists, useNotification } from "@/features/shared/shared";
import { WeeklyPlanTaskObservationFormComponent, weeklyPlanTaskObservationProvider, type WeeklyPlanTaskObservationForm } from "@/features/weekly-plan-task-observations/weekly-plan-task-observations";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";


export function ModalCreateWeeklyPlanTaskObservation() {
    const location = useLocation();
    const navigate = useNavigate();
    const notification = useNotification();
    const queryClient = useQueryClient();
    const taskId = getQueryParam(location, 'taskObservation');
    const show = queryParamExists(location, 'taskObservation');

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<WeeklyPlanTaskObservationForm>();

    const closeModal = () => handleDeleteQueryParam(location, navigate, 'taskObservation');

    useEffect(() => {
        if (!show) reset({ observation: '' });
    }, [show, reset]);

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: WeeklyPlanTaskObservationForm) => weeklyPlanTaskObservationProvider.createWeeklyPlanTaskObservation(payload),
        onSuccess: (message) => {
            notification.success(message);
            queryClient.invalidateQueries({ queryKey: ['getWeeklyPlanTaskObservations', taskId] });
            closeModal();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (form: WeeklyPlanTaskObservationForm) => {
        if (!taskId) return;

        mutate({ ...form, weekly_plan_task_id: Number(taskId) });
    }

    return (
        <Modal modal={show} closeModal={closeModal} title="Nueva observación" width="sm:max-w-lg">
            <div className="space-y-6">
                <CustomForm onSubmit={handleSubmit(onSubmit)} className="border-none p-0 shadow-none">
                    <WeeklyPlanTaskObservationFormComponent register={register} errors={errors} showTaskField={false} />

                    <CustomFilledButton
                        type="submit"
                        label="Guardar observación"
                        disabled={isPending}
                        fullWitdh
                    />
                </CustomForm>
            </div>
        </Modal>
    )
}
