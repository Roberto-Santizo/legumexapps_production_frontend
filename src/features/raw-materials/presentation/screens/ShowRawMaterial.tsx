import { Loading, Title } from "@/features/shared/shared";
import { rawMaterialProvider } from "@/features/raw-materials/raw-materials";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowRawMaterial() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getRawMaterialItemByCode', id],
        queryFn: () => rawMaterialProvider.getRawMaterialItemByCode(id!)
    });


    if (isLoading) return <Loading />
    if (data) return (
        <Title title="Materia Prima" subtitle="Información de la materia prima" />
    )
}
