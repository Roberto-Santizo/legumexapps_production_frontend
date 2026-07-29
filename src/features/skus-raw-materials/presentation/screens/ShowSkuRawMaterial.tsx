import { Loading, Title } from "@/features/shared/shared";
import { skuRawMaterialProvider } from "@/features/skus-raw-materials/skus-raw-materials";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowSkuRawMaterial() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getSkuRawMaterialById', id],
        queryFn: () => skuRawMaterialProvider.getSkuRawMaterialById(id!)
    });


    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Materia Prima por SKU" subtitle="Información de la materia prima por SKU" />

            <section>
                <p className="">{data.sku}</p>
                <p className="">{data.raw_material}</p>
                <p className="">{data.percentage}</p>
            </section>
        </div>
    )
}
