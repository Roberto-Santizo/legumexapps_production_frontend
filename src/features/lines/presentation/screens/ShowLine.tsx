import { linesRepositoryProvider } from "@/features/lines/lines";
import { Loading, Title } from "@/features/shared/shared";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowLine() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getLineByCode', id],
        queryFn: () => linesRepositoryProvider.getLineByCode(id!)
    });

    if (isLoading) return <Loading />
    if (data) return (
        <div>
            <Title title="Línea" subtitle="Información de la línea" />
        </div>
    )
}
