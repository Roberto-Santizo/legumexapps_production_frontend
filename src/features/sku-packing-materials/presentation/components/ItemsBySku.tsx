import { ActionsMenu, CustomFilledButton, Table, Tbody, Td, Th, Thead, Tr, useNotification } from "@/features/shared/shared";
import { PackageSearch, TrashIcon } from "lucide-react";
import { ModalCreateSkuPackingMaterial, skuPackingMaterialProvider } from "@/features/sku-packing-materials/sku-packing-materials";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";

export function ItemsBySku() {
    const { id } = useParams();
    const notification = useNotification();
    const [modal, setModal] = useState(false);

    const { data, refetch } = useQuery({
        queryKey: ['getSkuPackingMaterialsBySku', id],
        queryFn: () => skuPackingMaterialProvider.getSkuPackingMaterials(id!, '', '')
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

    const handleDeleteItem = (id: string) => {
        notification.question('¿Desea eliminar el item?', 'Eliminar', 'Una vez eliminado no será tomando en cuenta en tareas programadas', () => mutate(id));
    }

    if (data) return (
        <section className="space-y-3">
            <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold text-ink">Receta de Material de Empaque</h2>
                <CustomFilledButton
                    label="Agregar Item"
                    type="button"
                    onClick={() => setModal(true)}
                />
            </div>

            <ModalCreateSkuPackingMaterial
                modal={modal}
                closeModal={() => setModal(false)}
                refetch={refetch}
            />


            {data.data.length ? (
                <Table>
                    <Thead>
                        <Th text="Material de Empaque" />
                        <Th text="Código" />
                        <Th text="Libras por Item" />
                        <Th text="" />
                    </Thead>

                    <Tbody>
                        {data.data.map(item => (
                            <Tr key={item.packing_material_id}>
                                <Td>{item.packing_material}</Td>
                                <Td>{item.packing_material_code}</Td>
                                <Td>{item.lbs_per_item}</Td>
                                <Td>
                                    <ActionsMenu
                                        items={[
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
                    <p className="text-sm text-ink-muted">No hay materiales de empaque registrados</p>
                </div>
            )}
        </section>
    )
}
