import { Controller, useForm } from "react-hook-form";
import { CustomFilledButton, CustomForm } from "@/features/shared/shared";
import { EmployeeSelect, type EmployeeOption, type WeeklyPlanTaskEmployeeForm } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    label: string;
    submitLabel: string;
    options: EmployeeOption[];
    isLoadingOptions: boolean;
    isPending: boolean;
    onSubmit: (payload: WeeklyPlanTaskEmployeeForm) => void;
}

export function EmployeePickerForm({ label, submitLabel, options, isLoadingOptions, isPending, onSubmit }: Props) {
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<WeeklyPlanTaskEmployeeForm>();

    return (
        <CustomForm onSubmit={handleSubmit(onSubmit)} className="border-none p-0 shadow-none">
            <div className="flex flex-col gap-2">
                <label htmlFor="weekly_plan_employee_id" className="text-sm font-medium text-ink">{label}</label>

                <Controller
                    name="weekly_plan_employee_id"
                    control={control}
                    rules={{ required: 'Selecciona un empleado' }}
                    render={({ field }) => (
                        <EmployeeSelect
                            inputId="weekly_plan_employee_id"
                            options={options}
                            value={field.value}
                            onChange={field.onChange}
                            isLoading={isLoadingOptions}
                        />
                    )}
                />

                <p className="text-xs text-red-400">{errors.weekly_plan_employee_id?.message}</p>
            </div>

            <CustomFilledButton type="submit" label={submitLabel} disabled={isPending} fullWitdh />
        </CustomForm>
    )
}
