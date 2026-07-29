import { Loading, Title } from "@/features/shared/shared";
import { ItemsBySku } from "@/features/sku-packing-materials/sku-packing-materials";
import { RawMaterialsBySku } from "@/features/skus-raw-materials/skus-raw-materials";
import { skuProvider } from "@/features/skus/skus";
import { Boxes, Building2, Hash, Layers, Package } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowSku() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getSkuByCode', id],
        queryFn: () => skuProvider.getSkuByCode(id!)
    });

    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-10">
            <Title title="SKU" subtitle="Información del SKU" />

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-line bg-surface p-4">
                    <div className="mb-2 flex items-center gap-2 text-ink-muted">
                        <Hash className="size-4" />
                        <span className="text-xs font-medium uppercase tracking-wider">Código</span>
                    </div>
                    <p className="text-lg font-semibold text-ink">{data.code}</p>
                </div>

                <div className="rounded-xl border border-line bg-surface p-4">
                    <div className="mb-2 flex items-center gap-2 text-ink-muted">
                        <Package className="size-4" />
                        <span className="text-xs font-medium uppercase tracking-wider">Producto</span>
                    </div>
                    <p className="text-lg font-semibold text-ink">{data.product_name}</p>
                </div>

                <div className="rounded-xl border border-line bg-surface p-4">
                    <div className="mb-2 flex items-center gap-2 text-ink-muted">
                        <Layers className="size-4" />
                        <span className="text-xs font-medium uppercase tracking-wider">Presentación</span>
                    </div>
                    <p className="text-lg font-semibold text-ink">{data.presentation}</p>
                </div>

                <div className="rounded-xl border border-line bg-surface p-4">
                    <div className="mb-2 flex items-center gap-2 text-ink-muted">
                        <Boxes className="size-4" />
                        <span className="text-xs font-medium uppercase tracking-wider">Cajas por Tarima</span>
                    </div>
                    <p className="text-lg font-semibold text-ink">{data.boxes_per_pallet}</p>
                </div>

                <div className="rounded-xl border border-line bg-surface p-4">
                    <div className="mb-2 flex items-center gap-2 text-ink-muted">
                        <Building2 className="size-4" />
                        <span className="text-xs font-medium uppercase tracking-wider">Cliente</span>
                    </div>
                    <p className="text-lg font-semibold text-ink">{data.client}</p>
                </div>
            </section>

            <ItemsBySku />
            <RawMaterialsBySku />
        </div>
    )
}
