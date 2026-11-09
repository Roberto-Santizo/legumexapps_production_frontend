type Props = {
    term: string;
}

export function EmployeePickerEmpty({ term }: Props) {
    return (
        <p className="px-5 py-10 text-center text-sm text-ink-subtle">
            {term.trim() === ''
                ? 'No hay empleados disponibles para asignar.'
                : `Ningún empleado coincide con “${term.trim()}”.`}
        </p>
    )
}
