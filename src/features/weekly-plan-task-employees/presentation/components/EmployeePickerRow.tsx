import { CheckIcon } from "lucide-react";
import { EmployeePhoto } from "@/features/shared/shared";
import { EmployeeIdentityText, type EmployeeOption } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    option: EmployeeOption;
    checked: boolean;
    onSelect: (employeeId: string) => void;
    onBlur?: () => void;
}

export function EmployeePickerRow({ option, checked, onSelect, onBlur }: Props) {
    return (
        <div className={`flex items-center gap-3 border-l-[3px] px-4 py-2.5 transition-colors motion-reduce:transition-none ${checked ? 'border-ink bg-canvas/70' : 'border-transparent hover:bg-canvas/40'}`}>
            <EmployeePhoto
                code={option.code}
                name={option.name}
                zoomable
                detail={`${option.code} · ${option.position}`}
                className="aspect-[3/4] w-10 shrink-0 rounded-md border border-line"
            />

            <button
                type="button"
                role="radio"
                aria-checked={checked}
                onClick={() => onSelect(option.value)}
                onBlur={onBlur}
                className="flex min-w-0 flex-1 cursor-pointer items-center justify-between gap-3 rounded-md py-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
                <EmployeeIdentityText name={option.name} code={option.code} position={option.position} />

                <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors ${checked ? 'border-ink bg-ink text-surface' : 'border-line-strong text-transparent'}`}>
                    <CheckIcon className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
            </button>
        </div>
    )
}
