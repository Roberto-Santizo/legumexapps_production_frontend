import { AlertCircleIcon } from "lucide-react";

type Props = {
    title: string;
    errors: string[];
}

export function TaskEmployeeErrorList({ title, errors }: Props) {
    if (errors.length === 0) return null;

    return (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50/60 px-5 py-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-red-800">
                <AlertCircleIcon className="size-4" aria-hidden="true" />
                {title}
            </p>

            <ul className="mt-2 space-y-1 pl-6 text-sm text-red-700">
                {errors.map((error) => (
                    <li key={error} className="list-disc">{error}</li>
                ))}
            </ul>
        </div>
    )
}
