import { Loading, Title } from "@/features/shared/shared";
import { skuPackingMaterialProvider } from "@/features/sku-packing-materials/sku-packing-materials";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowSkuPackingMaterial() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getSkuPackingMaterialById', id],
        queryFn: () => skuPackingMaterialProvider.getSkuPackingMaterialById(id!)
    });


    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Material de Empaque por SKU" subtitle="Información del material de empaque por SKU" />

            <section>
                <p className="">{data.sku}</p>
                <p className="">{data.packing_material}</p>
                <p className="">{data.lbs_per_item}</p>
            </section>
        </div>
    )
}
