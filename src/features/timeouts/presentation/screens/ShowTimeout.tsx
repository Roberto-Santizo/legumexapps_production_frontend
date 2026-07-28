import { Loading, Title } from "@/features/shared/shared";
import { timeoutProvider } from "@/features/timeouts/timeouts";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowTimeout() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getTimeoutById', id],
        queryFn: () => timeoutProvider.getTimeoutById(id!)
    });


    if (isLoading) return <Loading />
    if (data) return (
        <Title title="Tiempo Muerto" subtitle="Información del tiempo muerto" />
    )
}
