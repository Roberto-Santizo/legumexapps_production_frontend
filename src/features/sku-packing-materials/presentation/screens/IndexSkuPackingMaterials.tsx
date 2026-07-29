import { CustomFilledButton, CustomNavTable, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, useNotification, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { skuPackingMaterialProvider } from "@/features/sku-packing-materials/sku-packing-materials";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export function IndexSkuPackingMaterials() {
    const navigate = useNavigate();
    const notification = useNotification();

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getSkuPackingMaterials', page + 1, rowsPerPage],
        queryFn: () => skuPackingMaterialProvider.getSkuPackingMaterials('', `${rowsPerPage}`, `${page + 1}`)
    });

    const { mutate } = useMutation({
        mutationFn: (id: string) => skuPackingMaterialProvider.deleteSkuPackingMaterialById(id),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleDeleteItem = (id: string) => notification.question('¿Desea eliminar el item?', 'Eliminar', 'El item se eliminará del sistema', () => mutate(id));
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Materiales de Empaque por SKU" subtitle="Listado de materiales de empaque por SKU registrados" />
                <CustomFilledButton
                    label="Crear Item"
                    type="button"
                    icon={<PlusIcon />}
                    onClick={() => navigate('/sku-material-empaque/crear')}
                />
            </div>

            <section>
                <Table>
                    <Thead>
                        <Th text="SKU" />
                        <Th text="Material de Empaque" />
                        <Th text="Libras por Item" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(item => (
                            <Tr>
                                <Td>{item.sku}</Td>
                                <Td>{item.packing_material}</Td>
                                <Td>{item.lbs_per_item}</Td>
                                <Td className="flex gap-3">
                                    <CustomNavTable icon={<EyeIcon />} onClick={() => navigate(`/sku-material-empaque/${item.id}`)} />
                                    <CustomNavTable icon={<EditIcon />} onClick={() => navigate(`/sku-material-empaque/${item.id}/editar`)} />
                                    <CustomNavTable icon={<TrashIcon />} onClick={() => handleDeleteItem(`${item.id}`)} />
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
