import { ActionsMenu, CustomFilledButton, Table, Tbody, Td, Th, Thead, Tr, useNotification } from "@/features/shared/shared";
import { EditIcon, PackageSearch, TrashIcon } from "lucide-react";
import { ModalCreateSkuRawMaterial, ModalUpdateSkuRawMaterial, skuRawMaterialProvider } from "@/features/skus-raw-materials/skus-raw-materials";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";


export function RawMaterialsBySku() {
    const { id } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const itemId = searchParams.get('rawMaterialItemId');
    const [modal, setModal] = useState(false);

    const { data, refetch } = useQuery({
        queryKey: ['getSkuRawMaterialsBySku', id],
        queryFn: () => skuRawMaterialProvider.getSkuRawMaterials(id!, '', '')
    });

    const { mutate } = useMutation({
        mutationFn: (id: string) => skuRawMaterialProvider.deleteSkuRawMaterialById(id),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleDeleteItem = (id: string) => {
        notification.question('¿Desea eliminar el item?', 'Eliminar', 'Una vez eliminado no será tomando en cuenta en tareas programadas', () => mutate(id));
    }

    const closeUpdateModal = () => {
        searchParams.delete('rawMaterialItemId');
        setSearchParams(searchParams);
    }

    if (data) return (
        <section className="space-y-3">
            <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold text-ink">Receta de Materia Prima</h2>
                <CustomFilledButton
                    label="Agregar Item"
                    type="button"
                    onClick={() => setModal(true)}
                />
            </div>

            <ModalCreateSkuRawMaterial
                modal={modal}
                closeModal={() => setModal(false)}
                refetch={refetch}
            />

            <ModalUpdateSkuRawMaterial
                modal={!!itemId}
                closeModal={closeUpdateModal}
                refetch={refetch}
                itemId={itemId ?? ''}
            />


            {data.data.length ? (
                <Table>
                    <Thead>
                        <Th text="Materia Prima" />
                        <Th text="Porcentaje" />
                        <Th text="" />
                    </Thead>

                    <Tbody>
                        {data.data.map(item => (
                            <Tr key={item.raw_material_id}>
                                <Td>{item.raw_material}</Td>
                                <Td>{item.percentage}</Td>
                                <Td>
                                    <ActionsMenu
                                        items={[
                                            { label: "Editar", icon: <EditIcon />, onClick: () => navigate(`?rawMaterialItemId=${item.id}`), danger: false },
                                            { label: "Eliminar", icon: <TrashIcon />, onClick: () => handleDeleteItem(`${item.id}`), danger: true },
                                        ]}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            ) : (
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface py-10 text-center">
                    <PackageSearch className="size-6 text-ink-subtle" />
                    <p className="text-sm text-ink-muted">No hay materias primas registradas</p>
                </div>
            )}
        </section>
    )
}
