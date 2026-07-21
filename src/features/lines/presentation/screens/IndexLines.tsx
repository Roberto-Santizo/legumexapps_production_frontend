import { ErrorComponent, LoadingData, Pagination, Table, Tbody, Td, Th, Thead, Title, Tr, usePagination } from "@/features/shared/shared";
import { useQuery } from "@tanstack/react-query";
import { linesRepositoryProvider } from "@/features/lines/lines";
import { useSearchParams } from "react-router-dom";

export function IndexLines() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, rowsPerPage } = usePagination(searchParams);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getLines', rowsPerPage, page],
        queryFn: () => linesRepositoryProvider.getLines(`${rowsPerPage}`, `${page + 1}`),
        retry: false
    });

    if (isLoading) return <LoadingData />
    if (isError) return <ErrorComponent message={error.message} />
    if (data) return (
        <div className="space-y-5">
            <Title title="Líneas" subtitle="Listado de líneas registradas" />

            <section>
                <Table>
                    <Thead>
                        <Th text="Linea" />
                        <Th text="Código" />
                        <Th text="Acciones" />
                    </Thead>

                    <Tbody>
                        {data.data.map(line => (
                            <Tr>
                                <Td>{line.name}</Td>
                                <Td>{line.code}</Td>
                            </Tr>

                        ))}
                    </Tbody>
                </Table>
            </section>

            <Pagination
                count={data.total!}
                page={page}
                rowsPerPage={rowsPerPage}
                setSearchParams={setSearchParams}
            />
        </div>
    )
}
