import { CustomFilledButton, CustomForm, Modal } from "@/features/shared/shared";
import { EndTaskFormComponent, EndTaskSummary, isWasteRequired, toFiniteNumber, useEndWeeklyPlanTask, type WeeklyPlanTask, type WeeklyPlanTaskEndForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import type { CaptureType } from "@/features/capture-fields/capture-fields";

type Props = {
    modal: boolean;
    closeModal: () => void;
    refetch: () => void;
    task: WeeklyPlanTask;
    captureType?: CaptureType;
}

export function ModalEndWeeklyPlanTask({ modal, closeModal, refetch, task, captureType }: Props) {
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        setError,
        control,
        formState: { errors }
    } = useForm<WeeklyPlanTaskEndForm>();

    const producedBoxes = toFiniteNumber(useWatch({ control, name: 'produced_boxes' }));

    useEffect(() => {
        if (modal && task.recorded_pounds > 0) setValue('weighed_pounds', task.recorded_pounds);
    }, [modal, task.recorded_pounds, setValue]);

    useEffect(() => {
        if (modal && task.waste_pounds !== null) setValue('waste_pounds', task.waste_pounds);
    }, [modal, task.waste_pounds, setValue]);

    const { handleEndTask, isEnding } = useEndWeeklyPlanTask({
        task,
        setError,
        refetch,
        onEnded: () => {
            reset();
            closeModal();
        }
    });

    return (
        <Modal modal={modal} closeModal={closeModal} title="Cerrar Tarea" width="sm:max-w-lg">
            <div className="space-y-5">
                <EndTaskSummary task={task} producedBoxes={producedBoxes} />

                <CustomForm onSubmit={handleSubmit(handleEndTask)}>
                    <EndTaskFormComponent register={register} errors={errors} wasteRequired={isWasteRequired(captureType)} />

                    <CustomFilledButton type="submit" label="Cerrar Tarea" disabled={isEnding} />
                </CustomForm>
            </div>
        </Modal>
    )
}
