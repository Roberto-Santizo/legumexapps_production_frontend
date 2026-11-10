import { Controller, useForm } from "react-hook-form";
import { CustomFilledButton, CustomForm } from "@/features/shared/shared";
import { EmployeePhotoPicker, type EmployeeOption, type WeeklyPlanTaskEmployeeForm } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

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
            <fieldset className="flex min-w-0 flex-col gap-2">
                <legend className="mb-2 text-sm font-medium text-ink">{label}</legend>

                <Controller
                    name="weekly_plan_employee_id"
                    control={control}
                    rules={{ required: 'Selecciona un empleado' }}
                    render={({ field }) => (
                        <EmployeePhotoPicker
                            options={options}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            isLoading={isLoadingOptions}
                        />
                    )}
                />

                <p className="text-xs text-red-400">{errors.weekly_plan_employee_id?.message}</p>
            </fieldset>

            <CustomFilledButton type="submit" label={submitLabel} disabled={isPending} fullWitdh />
        </CustomForm>
    )
}
