import { CustomFilledButton, CustomForm, DateFormField, Modal } from "@/features/shared/shared";
import { useForm } from "react-hook-form";
import type { AssignOperationDateForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

type Props = {
    modal: boolean;
    closeModal: () => void;
    tasksIds: string[];
}

export function ModalAssignOperationDate({ modal, closeModal, tasksIds }: Props) {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<AssignOperationDateForm>();

    const onSubmit = (payload: AssignOperationDateForm) => {
        payload.tasks_ids = tasksIds;
        console.log(payload);
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

                <CustomFilledButton type="submit" label="Asignar" />
            </CustomForm>
        </Modal>
    )
}
