import { BulkUploadModal } from "@/features/shared/shared";
import { formatUploadWeeklyPlanEmployeesMessage, weeklyPlanEmployeeBulkUploadColumns, weeklyPlanEmployeeProvider } from "@/features/weekly-plan-employees/weekly-plan-employees";

type Props = {
    modal: boolean;
    closeModal: () => void;
    onSuccess?: () => void;
}

export function ModalUploadWeeklyPlanEmployees({ modal, closeModal, onSuccess = () => { } }: Props) {
    return (
        <BulkUploadModal
            modal={modal}
            closeModal={closeModal}
            title="Carga masiva de empleados del plan semanal"
            templateName="empleados_plan_semanal"
            columns={weeklyPlanEmployeeBulkUploadColumns}
            upload={(file) => weeklyPlanEmployeeProvider.uploadFile(file).then(formatUploadWeeklyPlanEmployeesMessage)}
            onSuccess={onSuccess}
            note="Los empleados, las posiciones y el plan semanal deben existir antes de la carga. Un empleado solo puede ocupar una posición por plan."
        />
    )
}
