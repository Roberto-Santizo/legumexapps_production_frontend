import { ActionsMenu, Loading, Table, Tbody, Td, Th, Thead, Title, Tr, useNotification } from "@/features/shared/shared";
import { PackingMaterialTransactionDocument, packingMaterialTransactionProvider } from "@/features/packing-material-transactions/packing-material-transactions";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { DownloadIcon, EditIcon, PackageSearch, TrashIcon } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ModalUpdatePackingMaterialTransactionItem, packingMaterialTransactionItemProvider } from "@/features/packing-material-transaction-items/packing-material-transaction-items";

export function ShowPackingMaterialTransaction() {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const notification = useNotification();
    const itemId = searchParams.get('transactionItemId');

    const { data, isLoading } = useQuery({
        queryKey: ['getPackingMaterialTransactionById', id],
        queryFn: () => packingMaterialTransactionProvider.getPackingMaterialTransactionById(id!)
    });

    const { data: items, refetch } = useQuery({
        queryKey: ['getPackingMaterialTransactionItemsById', id],
        queryFn: () => packingMaterialTransactionItemProvider.getPackingMaterialTransactionItems('', '', id!)
    });

    const { mutate } = useMutation({
        mutationFn: (itemId: string) => packingMaterialTransactionItemProvider.deletePackingMaterialTransactionItemById(itemId),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const handleDeleteItem = (itemId: string) => {
        notification.question('¿Desea eliminar el item?', 'Eliminar', 'El material dejará de formar parte de la boleta de la transacción', () => mutate(itemId));
    }

    const openUpdateModal = (itemId: number) => {
        searchParams.set('transactionItemId', `${itemId}`);
        setSearchParams(searchParams);
    }

    const closeUpdateModal = () => {
        searchParams.delete('transactionItemId');
        setSearchParams(searchParams);
    }

    if (isLoading) return <Loading />
    if (data && items) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Transacción de Material de Empaque" subtitle="Información de la transacción de material de empaque" />

                <PDFDownloadLink
                    document={<PackingMaterialTransactionDocument transaction={data} items={items.data} />}
                    fileName={`boleta-${data.reference}.pdf`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-ink/90 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ink/20 focus:ring-offset-2"
                >
                    {({ loading }) => (
                        <>
                            <DownloadIcon />
                            <p className="text-white font-semibold">{loading ? 'Generando PDF' : 'Descargar PDF'}</p>
                        </>
                    )}
                </PDFDownloadLink>
            </div>

            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-ink">Materiales de la Transacción</h2>

                <ModalUpdatePackingMaterialTransactionItem
                    modal={!!itemId}
                    closeModal={closeUpdateModal}
                    refetch={refetch}
                    itemId={itemId ?? ''}
                />

                {items.data.length ? (
                    <Table>
                        <Thead>
                            <Th text="Código" />
                            <Th text="Material" />
                            <Th text="Lote" />
                            <Th text="Destino" />
                            <Th text="Cantidad" />
                            <Th text="" />
                        </Thead>

                        <Tbody>
                            {items.data.map(item => (
                                <Tr key={item.id}>
                                    <Td>{item.packing_material_code ?? '-'}</Td>
                                    <Td>{item.packing_material_name ?? '-'}</Td>
                                    <Td>{item.lote}</Td>
                                    <Td>{item.destination ?? '-'}</Td>
                                    <Td>{item.quantity}</Td>
                                    <Td>
                                        <ActionsMenu
                                            items={[
                                                { label: "Editar", icon: <EditIcon />, onClick: () => openUpdateModal(item.id), danger: false },
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
                        <p className="text-sm text-ink-muted">No hay materiales registrados en la transacción</p>
                    </div>
                )}
            </section>

            <section className="h-[calc(100vh-14rem)] overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <PDFViewer width="100%" height="100%" showToolbar={false} className="border-0">
                    <PackingMaterialTransactionDocument transaction={data} items={items.data} />
                </PDFViewer>
            </section>
        </div>
    )
}
