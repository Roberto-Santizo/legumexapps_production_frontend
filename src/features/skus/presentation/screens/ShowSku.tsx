import { Loading, Title } from "@/features/shared/shared";
import { skuProvider } from "@/features/skus/skus";
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
        <div className="space-y-5">
            <Title title="SKU" subtitle="Información del SKU" />

            <section>
                <p className="">{data.code}</p>
                <p className="">{data.product_name}</p>
                <p className="">{data.presentation}</p>
                <p className="">{data.boxes_per_pallet}</p>
                <p className="">{data.client}</p>
            </section>
        </div>
    )
}
