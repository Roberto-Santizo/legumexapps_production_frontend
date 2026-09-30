import { CustomFilledButton, Drawer, SelectFormField, TextFormField, type FilterField } from "@/features/shared/shared";
import { FilterIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm, type DefaultValues, type Path } from "react-hook-form";

type FiltersDrawerProps<T extends Record<string, string>> = {
    open: boolean;
    close: () => void;
    fields: FilterField<T>[];
    filters: T;
    setFilters: (values: Partial<T>) => void;
    clearFilters: () => void;
    title?: string;
};

type FiltersButtonProps<T extends Record<string, string>> = {
    filters: T;
    onClick: () => void;
    label?: string;
};

const countActiveFilters = (filters: Record<string, string>) => Object.values(filters).filter(value => value !== '' && value != null).length;

const fieldValueLabel = <T extends Record<string, string>>(field: FilterField<T>, value: string) => field.options?.find(option => `${option.value}` === value)?.label ?? value;

export function FiltersButton<T extends Record<string, string>>({ filters, onClick, label = "Filtros" }: FiltersButtonProps<T>) {
    const active = countActiveFilters(filters);

    return (
        <button
            type="button"
            onClick={onClick}
            className="relative inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-ink/90 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ink/20 focus:ring-offset-2 cursor-pointer"
        >
            <FilterIcon className="h-4 w-4" />
            <span>{label}</span>
            {active > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold tabular-nums text-ink">
                    {active}
                </span>
            )}
        </button>
    );
}

export function FiltersDrawer<T extends Record<string, string>>({ open, close, fields, filters, setFilters, clearFilters, title = "Filtros" }: FiltersDrawerProps<T>) {
    const { handleSubmit, register, control, reset } = useForm<T>({ defaultValues: filters as DefaultValues<T> });

    useEffect(() => {
        reset(filters);
    }, [filters, reset, open]);

    const activeFields = fields.filter(field => filters[field.name] !== '' && filters[field.name] != null);

    const onSubmit = (payload: T) => {
        setFilters(payload);
        close();
    };

    const onClear = () => {
        clearFilters();
        close();
    };

    const onRemoveFilter = (name: FilterField<T>['name']) => {
        setFilters({ ...filters, [name]: '' });
    };

    return (
        <Drawer drawer={open} closeDrawer={close} title={title}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex min-h-full flex-col gap-6">
                <div className="space-y-3 border-b border-line pb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                        {activeFields.length === 0 ? "Sin filtros aplicados" : `${activeFields.length} ${activeFields.length === 1 ? "filtro aplicado" : "filtros aplicados"}`}
                    </p>

                    {activeFields.length > 0 && (
                        <ul className="flex flex-wrap gap-2">
                            {activeFields.map(field => (
                                <li key={field.name}>
                                    <button
                                        type="button"
                                        onClick={() => onRemoveFilter(field.name)}
                                        aria-label={`Quitar filtro ${field.label}`}
                                        className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas py-1 pl-3 pr-2 text-xs text-ink transition hover:border-line-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 cursor-pointer"
                                    >
                                        <span className="text-ink-muted">{field.label}:</span>
                                        <span className="font-semibold">{fieldValueLabel(field, filters[field.name])}</span>
                                        <XIcon className="h-3.5 w-3.5 text-ink-subtle transition group-hover:text-ink" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    {fields.map(field => field.type === 'select' ? (
                        <SelectFormField<T>
                            key={field.name}
                            name={field.name as unknown as Path<T>}
                            label={field.label}
                            validation={{}}
                            control={control}
                            options={[{ value: '', label: 'Todos' }, ...(field.options ?? [])]}
                        />
                    ) : (
                        <TextFormField<T>
                            key={field.name}
                            name={field.name as unknown as Path<T>}
                            label={field.label}
                            placeholder={field.placeholder ?? ''}
                            type={field.type}
                            register={register}
                            validation={{}}
                        />
                    ))}
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3 border-t border-line pt-5">
                    <button
                        type="button"
                        onClick={onClear}
                        className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:border-line-strong hover:bg-canvas focus:outline-none focus:ring-2 focus:ring-ink/20 focus:ring-offset-2 cursor-pointer"
                    >
                        Limpiar filtros
                    </button>
                    <CustomFilledButton label="Aplicar filtros" type="submit" />
                </div>
            </form>
        </Drawer>
    );
}
