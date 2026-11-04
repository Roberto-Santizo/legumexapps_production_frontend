import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Controller, type Control, type FieldValues, type Path, type RegisterOptions } from "react-hook-form";
import Select from "react-select";
import { useDebouncedValue, type Option } from "@/features/shared/shared";

type Props<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    control: Control<T>;
    validation: RegisterOptions<T, Path<T>>;
    queryKey: string;
    search: (term: string) => Promise<Option[]>;
    selectedOption?: Option | null;
    errorMessage?: string;
    disabled?: boolean;
    placeholder?: string;
    noOptionsMessage?: string;
};

export function AsyncSelectFormField<T extends FieldValues>({
    label,
    name,
    control,
    validation,
    queryKey,
    search,
    selectedOption = null,
    errorMessage,
    disabled = false,
    placeholder = 'Escribe para buscar',
    noOptionsMessage = 'Sin resultados'
}: Props<T>) {
    const [term, setTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [picked, setPicked] = useState<Option | null>(null);
    const debouncedTerm = useDebouncedValue(term.trim());

    const { data: options = [], isFetching, isError } = useQuery({
        queryKey: [queryKey, debouncedTerm],
        queryFn: () => search(debouncedTerm),
        enabled: isOpen,
        placeholderData: keepPreviousData
    });

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <Controller
                name={name}
                control={control}
                rules={validation}
                render={({ field }) => (
                    <Select<Option, false>
                        {...field}
                        inputId={name}
                        options={options}
                        value={[picked, selectedOption, ...options].find((option) => option?.value === field.value) ?? null}
                        onChange={(option) => {
                            setPicked(option);
                            field.onChange(option?.value);
                        }}
                        onInputChange={setTerm}
                        onMenuOpen={() => setIsOpen(true)}
                        onMenuClose={() => setIsOpen(false)}
                        filterOption={null}
                        isLoading={isFetching}
                        isDisabled={disabled}
                        isSearchable
                        placeholder={placeholder}
                        noOptionsMessage={() => isError ? 'No se pudo completar la búsqueda. Intenta de nuevo.' : noOptionsMessage}
                        loadingMessage={() => 'Buscando…'}
                        classNamePrefix="react-select "
                    />
                )}
            />

            <p className="text-red-400 text-xs">{errorMessage}</p>
        </div>
    );
}
