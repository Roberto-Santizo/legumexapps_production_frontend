import { ActionsMenu, CustomFilledButton, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon } from "lucide-react";
import { packingMaterialTransactionProvider } from "@/features/packing-material-transactions/packing-material-transactions";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export function IndexPackingMaterialTransactions() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading } = useQuery({
        queryKey: ['getPackingMaterialTransactions', page + 1, rowsPerPage],
        queryFn: () => packingMaterialTransactionProvider.getPackingMaterialTransactions(`${rowsPerPage}`, `${page + 1}`)
    });

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
                                    <ActionsMenu
                                        items={[
                                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/material-empaque-transacciones/${transaction.id}`) },
                                            { label: "Editar", icon: <EditIcon />, onClick: () => navigate(`/material-empaque-transacciones/${transaction.id}/editar`) },
                                        ]}
                                    />
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
