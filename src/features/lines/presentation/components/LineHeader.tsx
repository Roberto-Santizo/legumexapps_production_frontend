import { captureTypeDescriptions, captureTypeLabels } from "@/features/capture-fields/capture-fields";
import { MoonIcon, SunIcon } from "lucide-react";
import { LineCoverageChart, lineWildcardLabel, lineSupervisorLabel, type Line } from "@/features/lines/lines";

type Props = {
    line: Line;
}

export function LineHeader({ line }: Props) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div className="min-w-0">
                <p className="text-sm text-ink-muted">Línea</p>
                <h1 className="mt-1 flex flex-wrap items-baseline gap-x-3 text-[26px] font-semibold tracking-tight text-ink">
                    <span className="font-mono">{line.code}</span>
                    <span className="text-ink-muted">{line.name}</span>
                </h1>
            </div>

            <div className="flex w-full flex-wrap items-end gap-x-8 gap-y-4 sm:w-auto">
                <dl className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                    <div>
                        <dt className="text-xs text-ink-muted">Familia de captura</dt>
                        <dd className="mt-0.5 font-medium text-ink" title={captureTypeDescriptions[line.capture_type]}>{captureTypeLabels[line.capture_type]}</dd>
                    </div>
                    <div>
                        <dt className="text-xs text-ink-muted">Turno</dt>
                        <dd className="mt-0.5 inline-flex items-center gap-1.5 font-medium text-ink">
                            {line.shift ? <SunIcon className="size-4 text-ink-muted" /> : <MoonIcon className="size-4 text-ink-muted" />}
                            {line.shift ? 'AM' : 'PM'}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-xs text-ink-muted">Tipo</dt>
                        <dd className="mt-0.5 font-medium text-ink">{lineWildcardLabel(line.is_wildcard)}</dd>
                    </div>
                    <div>
                        <dt className="text-xs text-ink-muted">Supervisor</dt>
                        <dd className={`mt-0.5 font-medium ${line.supervisor_code ? 'font-mono text-ink' : 'text-ink-muted'}`}>{lineSupervisorLabel(line.supervisor_code)}</dd>
                    </div>
                </dl>

                <LineCoverageChart line={line} />
            </div>
        </header>
    )
}
