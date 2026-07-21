export function LoadingData() {
    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200 animate-pulse">
            <table className="w-full">
                <thead className="bg-slate-50">
                    <tr>
                        {[...Array(5)].map((_, index) => (
                            <th key={index} className="px-6 py-4">
                                <div className="h-3 w-20 rounded bg-slate-200" />
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {[...Array(6)].map((_, row) => (
                        <tr key={row}>
                            <td className="px-6 py-4">
                                <div className="h-4 w-32 rounded bg-slate-200" />
                            </td>

                            <td className="px-6 py-4">
                                <div className="h-4 w-24 rounded bg-slate-200" />
                            </td>

                            <td className="px-6 py-4">
                                <div className="h-4 w-40 rounded bg-slate-200" />
                            </td>

                            <td className="px-6 py-4">
                                <div className="h-7 w-20 rounded-full bg-slate-200" />
                            </td>

                            <td className="px-6 py-4">
                                <div className="h-4 w-24 rounded bg-slate-200" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
