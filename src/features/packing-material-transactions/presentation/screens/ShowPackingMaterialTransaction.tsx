import { Loading, Title } from "@/features/shared/shared";
import { packingMaterialTransactionProvider } from "@/features/packing-material-transactions/packing-material-transactions";
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
        <Title title="Transacción de Material de Empaque" subtitle="Información de la transacción de material de empaque" />
    )
}
