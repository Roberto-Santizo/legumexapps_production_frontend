import { Loading, Title } from "@/features/shared/shared";
import { PackingMaterialTransactionDocument, packingMaterialTransactionProvider } from "@/features/packing-material-transactions/packing-material-transactions";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { DownloadIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowPackingMaterialTransaction() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getPackingMaterialTransactionById', id],
        queryFn: () => packingMaterialTransactionProvider.getPackingMaterialTransactionById(id!)
    });

    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <Title title="Transacción de Material de Empaque" subtitle="Información de la transacción de material de empaque" />

                <PDFDownloadLink
                    document={<PackingMaterialTransactionDocument transaction={data} />}
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

            <section className="h-[calc(100vh-14rem)] overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <PDFViewer width="100%" height="100%" showToolbar={false} className="border-0">
                    <PackingMaterialTransactionDocument transaction={data} />
                </PDFViewer>
            </section>
        </div>
    )
}
