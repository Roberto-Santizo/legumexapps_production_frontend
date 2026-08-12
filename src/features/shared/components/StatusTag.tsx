type Props = {
    flag: number | boolean;
}

export function StatusTag({ flag }: Props) {
    const bgColor = flag ? 'bg-green-500' : 'bg-red-400';
    return (
        <p className={`p-2 shadow text-center text-white font-semibold rounded-2xl ${bgColor}`}>
            {flag ? 'Activo' : 'Inactivo'}
        </p>
    )
}
