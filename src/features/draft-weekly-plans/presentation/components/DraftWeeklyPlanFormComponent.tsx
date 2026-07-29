import { TextFormField } from "@/features/shared/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { DraftWeeklyPlanForm } from "@/features/draft-weekly-plans/draft-weekly-plans";

type Props = {
    register: UseFormRegister<DraftWeeklyPlanForm>;
    errors: FieldErrors<DraftWeeklyPlanForm>;
}

export function DraftWeeklyPlanFormComponent({ register, errors }: Props) {
    return (
        <>
            <TextFormField<DraftWeeklyPlanForm>
                name="week"
                label="Semana"
                placeholder="Número de semana"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.week?.message}
            />

            <TextFormField<DraftWeeklyPlanForm>
                name="year"
                label="Año"
                placeholder="Año"
                register={register}
                type="number"
                validation={{ required: 'El campo es requerido', valueAsNumber: true }}
                errorMessage={errors.year?.message}
            />
        </>
    )
}
