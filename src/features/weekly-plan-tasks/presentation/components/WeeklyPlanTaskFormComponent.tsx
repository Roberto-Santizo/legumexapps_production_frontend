import type { ReactNode } from "react";
import { DateFormField, SelectFormField, TextFormField } from "@/features/shared/shared";
import { peformancesOptions, performanceProvider } from "@/features/performances/performances";
import { useQuery } from "@tanstack/react-query";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { WeeklyPlanTaskCreateForm } from "@/features/weekly-plan-tasks/weekly-plan-tasks";

type Props = {
    register: UseFormRegister<WeeklyPlanTaskCreateForm>;
    errors: FieldErrors<WeeklyPlanTaskCreateForm>;
    control: Control<WeeklyPlanTaskCreateForm>;
}

type SectionProps = {
    title: string;
    description: string;
    children: ReactNode;
}

function FormSection({ title, description, children }: SectionProps) {
    return (
        <section className="space-y-4">
            <header className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">{title}</h3>
                <p className="text-right text-xs text-ink-subtle">{description}</p>
            </header>
            {children}
        </section>
    )
}

function FormSkeleton() {
    return (
        <div className="space-y-6" aria-busy="true" aria-label="Cargando formulario">
            {[0, 1, 2].map((section) => (
                <div key={section} className="space-y-4">
                    <div className="h-3 w-24 rounded-full bg-line" />
                    <div className="space-y-2">
                        <div className="h-3 w-16 rounded-full bg-line" />
                        <div className="relative h-10 overflow-hidden rounded-lg border border-line bg-canvas">
                            <span className="loading-sweep opacity-5" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function WeeklyPlanTaskFormComponent({ register, errors, control }: Props) {
    const { data: performancesData, isLoading } = useQuery({
        queryKey: ['getPerformances'],
        queryFn: () => performanceProvider.getPerformances('', '')
    });

    if (isLoading) return <FormSkeleton />;

    if (performancesData) return (
        <div className="space-y-7">
            <FormSection title="Producto" description="SKU y línea donde se produce">
                <SelectFormField<WeeklyPlanTaskCreateForm>
                    name="line_sku_id"
                    label="SKU · Línea"
                    control={control}
                    validation={{ required: 'Selecciona un SKU' }}
                    options={peformancesOptions(performancesData.data)}
                    errorMessage={errors.line_sku_id?.message}
                />
            </FormSection>

            <FormSection title="Producción" description="Cantidad y destino del pedido">
                <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-[minmax(0,10rem)_1fr]">
                    <TextFormField<WeeklyPlanTaskCreateForm>
                        name="boxes"
                        label="Cajas"
                        placeholder="0"
                        register={register}
                        type="number"
                        validation={{ required: 'Ingresa la cantidad de cajas', valueAsNumber: true }}
                        errorMessage={errors.boxes?.message}
                    />

                    <TextFormField<WeeklyPlanTaskCreateForm>
                        name="destination"
                        label="Destino"
                        placeholder="Ej. Estados Unidos"
                        register={register}
                        type="text"
                        validation={{ required: 'Ingresa el destino' }}
                        errorMessage={errors.destination?.message}
                    />
                </div>
            </FormSection>

            <FormSection title="Programación" description="Opcional · se puede asignar después">
                <div className="sm:max-w-xs">
                    <DateFormField<WeeklyPlanTaskCreateForm>
                        name="operation_date"
                        label="Fecha de operación"
                        register={register}
                        validation={{}}
                        errorMessage={errors.operation_date?.message}
                    />
                </div>
            </FormSection>
        </div>
    )
}
