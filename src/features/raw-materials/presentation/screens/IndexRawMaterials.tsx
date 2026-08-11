import { ActionsMenu, CustomFilledButton, Loading, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, usePagination } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon } from "lucide-react";
import { rawMaterialProvider } from "@/features/raw-materials/raw-materials";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export function IndexRawMaterials() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading } = useQuery({
        queryKey: ['getRawMaterialItems', page + 1, rowsPerPage],
        queryFn: () => rawMaterialProvider.getRawMaterialItems(`${rowsPerPage}`, `${page + 1}`)
    });

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
                            <Tr key={item.id}>
                                <Td>{item.product_name}</Td>
                                <Td>{item.code}</Td>
                                <Td className="flex gap-3">
                                    <ActionsMenu
                                        items={[
                                            { label: "Ver Detalles", icon: <EyeIcon />, onClick: () => navigate(`/items-materia-prima/${item.code}`) },
                                            { label: "Editar", icon: <EditIcon />, onClick: () => navigate(`/items-materia-prima/${item.code}/editar`) },
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
