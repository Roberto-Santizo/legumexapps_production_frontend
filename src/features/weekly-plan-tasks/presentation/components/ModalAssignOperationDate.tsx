import { CustomFilledButton, CustomForm, DateFormField, Modal, useNotification } from "@/features/shared/shared";
import { useForm } from "react-hook-form";
import { weeklyPlanTaskProvider, type AssignOperationDateForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";
import { useMutation } from "@tanstack/react-query";

type Props = {
    modal: boolean;
    closeModal: () => void;
    tasksIds: string[];
    callback?: () => void;
}

export function ModalAssignOperationDate({ modal, closeModal, tasksIds, callback }: Props) {
    const notification = useNotification();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<AssignOperationDateForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: AssignOperationDateForm) => weeklyPlanTaskProvider.assignOperationDateToTasks(payload),
        onSuccess: (message) => {
            notification.success(message);
            callback?.();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: AssignOperationDateForm) => {
        payload.tasksIds = tasksIds;
        mutate(payload);
        reset();
        closeModal();
    }

    return (
        <Modal modal={modal} closeModal={closeModal} title="Asignar Fecha de Operación" width="sm:max-w-md">
            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <DateFormField<AssignOperationDateForm>
                    name="operation_date"
                    label="Fecha de Operación"
                    register={register}
                    validation={{ required: 'El campo es requerido' }}
                    errorMessage={errors.operation_date?.message}
                />

                <CustomFilledButton type="submit" label="Asignar" disabled={isPending}/>
            </CustomForm>
        </Modal>
    )
}
