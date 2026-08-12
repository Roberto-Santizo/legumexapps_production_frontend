import { CustomFilledButton, CustomForm, Modal, SelectFormField, useNotification } from "@/features/shared/shared";
import { lineDependenciesRepositoryProvider, type LineDependencyForm } from "@/features/line-dependencies/line-dependencies";
import { linesOptions, linesRepositoryProvider, type Line } from "@/features/lines/lines";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
    lineId: Line['id'];
    modal: boolean;
    closeModal: () => void;
}

export function ModalCreateDependency({ modal, closeModal, lineId }: Props) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<LineDependencyForm>();

    const { data } = useQuery({
        queryKey: ['getLines'],
        queryFn: () => linesRepositoryProvider.getLines('', '', '')
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: LineDependencyForm) => lineDependenciesRepositoryProvider.createLineDependency(payload),
        onSuccess: (message) => {
            notification.success(message);
            closeModal();
            queryClient.invalidateQueries({ queryKey: ['getLineDependencies', lineId] });
            reset();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: LineDependencyForm) => {
        payload.line_id = lineId;
        mutate(payload);

    }
    if (data) return (
        <Modal modal={modal} closeModal={closeModal} title="Agregar Línea Dependiente">
            <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <SelectFormField
                    label="Línea Dependiente"
                    control={control}
                    name="line_dependent_id"
                    options={linesOptions(data.data)}
                    errorMessage={errors.line_dependent_id?.message}
                    validation={{ required: 'El campo es requerido' }}
                />

                <CustomFilledButton
                    label="Crear"
                    type="submit"
                    disabled={isPending}
                />
            </CustomForm>
        </Modal>
    )
}
