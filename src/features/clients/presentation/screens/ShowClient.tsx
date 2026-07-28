import { Loading, Title } from "@/features/shared/shared";
import { clientProvider } from "@/features/clients/clients";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowClient() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getClientById', id],
        queryFn: () => clientProvider.getClientById(id!)
    });


    if (isLoading) return <Loading />
    if (data) return (
        <Title title="Cliente" subtitle="Información del cliente" />
    )
}
