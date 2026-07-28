import { Loading, Title } from "@/features/shared/shared";
import { packingMaterialProvider } from "@/features/packing-materials/packing-materials";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowPackingMaterial() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getPackingMaterialItemByCode', id],
        queryFn: () => packingMaterialProvider.getPackingMaterialItemByCode(id!)
    });


    if (isLoading) return <Loading />
    if (data) return (
        <Title title="Material de Empaque" subtitle="Información del material de empaque" />
    )
}
