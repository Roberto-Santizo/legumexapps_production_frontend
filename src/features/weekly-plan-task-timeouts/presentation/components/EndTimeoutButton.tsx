import { TimerOffIcon } from "lucide-react";

type Props = {
    onClick: () => void;
}

export function EndTimeoutButton({ onClick }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-2 rounded-lg bg-[#a3402f] px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#8c3627] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3402f]/30 focus-visible:ring-offset-2 motion-reduce:transition-none"
        >
            <TimerOffIcon size={16} />
            Cerrar
        </button>
    )
}
