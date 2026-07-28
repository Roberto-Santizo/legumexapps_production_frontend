import { CustomFilledButton, CustomNavTable, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon } from "lucide-react";
import { skuProvider } from "@/features/skus/skus";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function IndexSkus() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading } = useQuery({
        queryKey: ['getSkus', page + 1, rowsPerPage],
        queryFn: () => skuProvider.getSkus(`${rowsPerPage}`, `${page + 1}`)
    });

    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="SKUs" subtitle="Listado de SKUs registrados" />
                <CustomFilledButton
                    label="Crear SKU"
                    type="button"
                    icon={<PlusIcon />}
                    onClick={() => navigate('/skus/crear')}
                />
            </div>

            <section>
                <Table>
                    <Thead>
                        <Th text="Código" />
                        <Th text="Producto" />
                        <Th text="Presentación" />
                        <Th text="Cajas por Tarima" />
                        <Th text="Cliente" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(item => (
                            <Tr>
                                <Td>{item.code}</Td>
                                <Td>{item.product_name}</Td>
                                <Td>{item.presentation}</Td>
                                <Td>{item.boxes_per_pallet}</Td>
                                <Td>{item.client}</Td>
                                <Td className="flex gap-3">
                                    <CustomNavTable icon={<EyeIcon />} onClick={() => navigate(`/skus/${item.code}`)} />
                                    <CustomNavTable icon={<EditIcon />} onClick={() => navigate(`/skus/${item.code}/editar`)} />
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
