import { Loading, Title } from "@/features/shared/shared";
import { performanceProvider } from "@/features/performances/performances";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowPerformance() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getPerformanceById', id],
        queryFn: () => performanceProvider.getPerformanceById(id!)
    });


    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Rendimiento" subtitle="Información del rendimiento" />

            <section>
                <p className="">{data.sku}</p>
                <p className="">{data.line}</p>
                <p className="">{data.lbs_performance}</p>
                <p className="">{data.accepted_percentage}</p>
                <p className="">{data.payment_method === 0 ? 'Horas Linea' : 'Horas Rendimiento'}</p>
            </section>
        </div>
    )
}
