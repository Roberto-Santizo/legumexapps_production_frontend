import type { ReactNode } from "react";
import { DateFormField, SelectFormField, TextFormField } from "@/features/shared/shared";
import { linesOptions, linesRepositoryProvider } from "@/features/lines/lines";
import { skuOptions, skuProvider } from "@/features/skus/skus";
import { useQuery } from "@tanstack/react-query";
import { useWatch, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import type { DraftWeeklyPlanTaskForm } from "@/features/draft-weekly-plan-tasks/draft-weekly-plan-tasks";

type Props = {
    register: UseFormRegister<DraftWeeklyPlanTaskForm>;
    errors: FieldErrors<DraftWeeklyPlanTaskForm>;
    control: Control<DraftWeeklyPlanTaskForm>;
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
                <p className="text-xs text-ink-subtle text-right">{description}</p>
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

export function DraftWeeklyPlanTaskFormComponent({ register, errors, control }: Props) {
    const skuId = useWatch({ control, name: 'sku_id' });

    const { data: skusData, isLoading: isLoadingSkus } = useQuery({
        queryKey: ['getSkus'],
        queryFn: () => skuProvider.getSkus('', '')
    });

    const { data: linesData, isFetching: isFetchingLines } = useQuery({
        queryKey: ['getLines', skuId],
        queryFn: () => linesRepositoryProvider.getLines('', '', `${skuId}`),
        enabled: !!skuId
    });

    const linesCount = linesData?.data.length ?? 0;

    const linesHint = !skuId
        ? 'Selecciona un SKU para ver las líneas que pueden producirlo.'
        : isFetchingLines
            ? 'Buscando líneas para este SKU…'
            : linesCount === 0
                ? 'Este SKU no tiene líneas asignadas.'
                : `${linesCount} ${linesCount === 1 ? 'línea disponible' : 'líneas disponibles'} para este SKU.`;

    if (isLoadingSkus) return <FormSkeleton />;

    if (skusData) return (
        <div className="space-y-7">
            <FormSection title="Producto" description="La línea depende del SKU">
                <div className="space-y-4">
                    <div className="relative pl-5">
                        <span aria-hidden className={`absolute left-[3.5px] top-3.5 -bottom-[1.375rem] w-px transition-colors duration-200 ${skuId ? 'bg-ink' : 'bg-line-strong'}`} />
                        <span aria-hidden className="absolute left-0 top-1.5 size-2 rounded-full bg-ink" />
                        <SelectFormField<DraftWeeklyPlanTaskForm>
                            name="sku_id"
                            label="SKU"
                            control={control}
                            validation={{ required: 'Selecciona un SKU' }}
                            options={skuOptions(skusData.data)}
                            errorMessage={errors.sku_id?.message}
                        />
                    </div>

                    <div className={`relative pl-5 transition-opacity duration-200 ${skuId ? 'opacity-100' : 'opacity-60'}`}>
                        <span
                            aria-hidden
                            className={`absolute left-0 top-1.5 size-2 rounded-full border transition-colors duration-200 ${skuId ? 'border-ink bg-ink' : 'border-line-strong bg-surface'}`}
                        />
                        <SelectFormField<DraftWeeklyPlanTaskForm>
                            name="line_id"
                            label="Línea"
                            control={control}
                            validation={{}}
                            options={linesOptions(linesData?.data ?? [])}
                            errorMessage={errors.line_id?.message}
                        />
                        <p className="-mt-1 text-xs text-ink-muted" aria-live="polite">{linesHint}</p>
                    </div>
                </div>
            </FormSection>

            <FormSection title="Producción" description="Cantidad y destino del pedido">
                <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-[minmax(0,10rem)_1fr]">
                    <TextFormField<DraftWeeklyPlanTaskForm>
                        name="boxes"
                        label="Cajas"
                        placeholder="0"
                        register={register}
                        type="number"
                        validation={{ required: 'Ingresa la cantidad de cajas', valueAsNumber: true }}
                        errorMessage={errors.boxes?.message}
                    />

                    <TextFormField<DraftWeeklyPlanTaskForm>
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

            <FormSection title="Programación" description="Día en que se opera la tarea">
                <div className="sm:max-w-xs">
                    <DateFormField<DraftWeeklyPlanTaskForm>
                        name="operation_date"
                        label="Fecha de operación"
                        register={register}
                        errorMessage={errors.operation_date?.message}
                    />
                </div>
            </FormSection>
        </div>
    )
}
