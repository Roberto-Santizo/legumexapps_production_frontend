import type { ReactNode } from "react";
import { getZoneTone, isCardAt, type ActivityBoardControls, type BoardTarget, type ZoneTone } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    target: BoardTarget;
    canDrop: boolean;
    board: ActivityBoardControls;
    alert?: boolean;
    className?: string;
    children: ReactNode;
}

const TONE_CLASS: Record<ZoneTone, string> = {
    idle: 'border-line',
    eligible: 'border-dashed border-ink/45',
    over: 'border-ink bg-canvas/70 ring-4 ring-ink/5',
    blocked: 'border-line opacity-45',
};

export function BoardDropZone({ target, canDrop, board, alert = false, className = '', children }: Props) {
    const { activeCard } = board;
    const isOrigin = activeCard !== undefined && isCardAt(activeCard, target);
    const tone = getZoneTone(activeCard !== undefined, canDrop, board.overTarget === target, isOrigin);

    return (
        <div
            onDragOver={canDrop ? (event) => board.hover(event, target) : undefined}
            onDragLeave={canDrop ? board.leave : undefined}
            onDrop={canDrop ? (event) => board.drop(event, target) : undefined}
            className={`flex flex-col overflow-hidden rounded-xl border transition-[border-color,background-color,opacity,box-shadow] motion-reduce:transition-none ${alert && tone === 'idle' ? 'border-red-300' : TONE_CLASS[tone]} ${className}`}
        >
            {children}
        </div>
    )
}
