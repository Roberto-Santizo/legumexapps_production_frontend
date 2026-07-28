import { Loading, Title } from "@/features/shared/shared";
import { positionProvider } from "@/features/positions/positions";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowPosition() {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['getPositionById', id],
        queryFn: () => positionProvider.getPositionById(id!)
    });


    if (isLoading) return <Loading />
    if (data) return (
        <div className="space-y-5">
            <Title title="Puesto" subtitle="Información del puesto" />

            <section>
                <p className="">{data.code}</p>
                <p className="">{data.activity}</p>
                <p className="">{data.line}</p>
            </section>
        </div>
    )
}
