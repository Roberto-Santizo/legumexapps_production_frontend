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
        <div className="space-y-5">
            <Title title="Línea" subtitle="Información de la línea" />

            <section>
                <p className="">{data.name}</p>
                <p className="">{data.code}</p>
                <p className="">{data.shift ? 'AM' : 'PM'}</p>
            </section>
        </div>
    )
}
