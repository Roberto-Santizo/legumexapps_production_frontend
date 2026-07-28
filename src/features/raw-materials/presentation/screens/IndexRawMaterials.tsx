import { CustomFilledButton, CustomNavTable, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, useNotification, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { rawMaterialProvider } from "@/features/raw-materials/raw-materials";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export function IndexRawMaterials() {
    const navigate = useNavigate();
    const notification = useNotification();

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getRawMaterialItems', page + 1, rowsPerPage],
        queryFn: () => rawMaterialProvider.getRawMaterialItems(`${rowsPerPage}`, `${page + 1}`)
    });

    const { mutate } = useMutation({
        mutationFn: (code: string) => rawMaterialProvider.deleteRawMaterialItemByCode(code),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleDeleteItem = (code: string) => notification.question('¿Desea eliminar el item?', 'Eliminar', 'El item se eliminará de las recetas relacionadas', () => mutate(code));
    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Materias Primas" subtitle="Listado de materias primas registradas" />
                <CustomFilledButton
                    label="Crear Item"
                    type="button"
                    icon={<PlusIcon />}
                    onClick={() => navigate('/items-materia-prima/crear')}
                />
            </div>

            <section>
                <Table>
                    <Thead>
                        <Th text="Nombre del Producto" />
                        <Th text="Código" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(item => (
                            <Tr>
                                <Td>{item.product_name}</Td>
                                <Td>{item.code}</Td>
                                <Td className="flex gap-3">
                                    <CustomNavTable icon={<EyeIcon />} onClick={() => navigate(`/items-materia-prima/${item.code}`)} />
                                    <CustomNavTable icon={<EditIcon />} onClick={() => navigate(`/items-materia-prima/${item.code}/editar`)} />
                                    <CustomNavTable icon={<TrashIcon />} onClick={() => handleDeleteItem(`${item.code}`)} />
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
