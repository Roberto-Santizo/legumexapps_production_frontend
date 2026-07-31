import { CustomFilledButton, CustomNavTable, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, useNotification, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { packingMaterialTransactionProvider } from "@/features/packing-material-transactions/packing-material-transactions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export function IndexPackingMaterialTransactions() {
    const navigate = useNavigate();
    const notification = useNotification();

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getPackingMaterialTransactions', page + 1, rowsPerPage],
        queryFn: () => packingMaterialTransactionProvider.getPackingMaterialTransactions(`${rowsPerPage}`, `${page + 1}`)
    });

    const { mutate } = useMutation({
        mutationFn: (id: string) => packingMaterialTransactionProvider.deletePackingMaterialTransactionById(id),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleDeleteTransaction = (id: string) => notification.question('¿Desea eliminar la transacción?', 'Eliminar', 'La transacción se eliminará permanentemente', () => mutate(id));
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Transacciones de Material de Empaque" subtitle="Listado de transacciones de material de empaque registradas" />
                <CustomFilledButton
                    label="Crear Transacción"
                    type="button"
                    icon={<PlusIcon />}
                />
            </div>

            <section>
                <Table>
                    <Thead>
                        <Th text="Referencia" />
                        <Th text="Responsable" />
                        <Th text="Usuario" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(transaction => (
                            <Tr key={transaction.id}>
                                <Td>{transaction.reference}</Td>
                                <Td>{transaction.responsable}</Td>
                                <Td>{transaction.user_name}</Td>
                                <Td className="flex gap-3">
                                    <CustomNavTable icon={<EyeIcon />} onClick={() => navigate(`/material-empaque-transacciones/${transaction.id}`)} />
                                    <CustomNavTable icon={<EditIcon />} onClick={() => navigate(`/material-empaque-transacciones/${transaction.id}/editar`)} />
                                    <CustomNavTable icon={<TrashIcon />} onClick={() => handleDeleteTransaction(`${transaction.id}`)} />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </section>

            <Pagination
                count={data.total!}
                page={page}
                rowsPerPage={rowsPerPage}
                setSearchParams={setSearchParams}
            />
        </div>
    )
}
