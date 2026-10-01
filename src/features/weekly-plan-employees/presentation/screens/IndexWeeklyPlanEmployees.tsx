import { CustomFilledButton, Title } from "@/features/shared/shared";
import { ModalUploadWeeklyPlanEmployees, WeeklyPlanEmployeesEmptyState } from "@/features/weekly-plan-employees/weekly-plan-employees";
import { UploadIcon } from "lucide-react";
import { useState } from "react";

export function IndexWeeklyPlanEmployees() {
    const [bulkUpload, setBulkUpload] = useState(false);

    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Empleados por Plan Semanal" subtitle="Asignación de empleados a posiciones en cada plan semanal" />
                <CustomFilledButton
                    label="Carga Masiva"
                    type="button"
                    icon={<UploadIcon />}
                    onClick={() => setBulkUpload(true)}
                />
            </div>

            <ModalUploadWeeklyPlanEmployees
                modal={bulkUpload}
                closeModal={() => setBulkUpload(false)}
            />

            <WeeklyPlanEmployeesEmptyState onUpload={() => setBulkUpload(true)} />
        </div>
    )
}
