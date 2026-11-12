import { TextFormField } from "@/features/shared/shared";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ActivityForm } from "@/features/activities/activities";

type Props = {
    register: UseFormRegister<ActivityForm>;
    errors: FieldErrors<ActivityForm>;
}

export function ActivityFormComponent({ register, errors }: Props) {
    return (
        <>
            <div className="space-y-1.5">
                <TextFormField<ActivityForm>
                    name="name"
                    label="Nombre"
                    placeholder="Ej. Recortador"
                    register={register}
                    type="text"
                    validation={{
                        required: 'El nombre es obligatorio.',
                        maxLength: { value: 100, message: 'El nombre no debe exceder 100 caracteres.' }
                    }}
                    errorMessage={errors.name?.message}
                />
                <p className="text-xs text-ink-muted">Se guarda en mayúsculas y no puede repetirse.</p>
            </div>

            <div className="space-y-1.5">
                <TextFormField<ActivityForm>
                    name="unit"
                    label="Unidad de medida"
                    placeholder="Ej. lbs/h"
                    register={register}
                    type="text"
                    validation={{
                        required: 'La unidad de medida es obligatoria.',
                        maxLength: { value: 50, message: 'La unidad de medida no debe exceder 50 caracteres.' }
                    }}
                    errorMessage={errors.unit?.message}
                />
                <p className="text-xs text-ink-muted">Con qué se mide el trabajo de esta actividad: lbs/h, canastas/h, bolsas/h…</p>
            </div>
        </>
    )
}
