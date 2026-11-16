import { useState, type DragEvent } from "react";
import type { BoardCard, BoardTarget } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Options = {
    cards: BoardCard[];
    onMove: (key: string, target: BoardTarget) => void;
}

const DRAG_FORMAT = 'text/plain';

export function useActivityBoard({ cards, onMove }: Options) {
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [overTarget, setOverTarget] = useState<BoardTarget | undefined>(undefined);
    const [isDragging, setIsDragging] = useState(false);

    const activeCard = cards.find((card) => card.key === activeKey);

    const clear = () => {
        setActiveKey(null);
        setOverTarget(undefined);
        setIsDragging(false);
    };

    const startDrag = (event: DragEvent, key: string) => {
        event.dataTransfer.setData(DRAG_FORMAT, key);
        event.dataTransfer.effectAllowed = 'move';
        setActiveKey(key);
        setIsDragging(true);
    };

    const toggleSelect = (key: string) => setActiveKey((prev) => (prev === key ? null : key));

    const hover = (event: DragEvent, target: BoardTarget) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        setOverTarget(target);
    };

    const leave = (event: DragEvent) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOverTarget(undefined);
    };

    const place = (target: BoardTarget) => {
        if (activeCard) onMove(activeCard.key, target);
        clear();
    };

    const drop = (event: DragEvent, target: BoardTarget) => {
        event.preventDefault();
        place(target);
    };

    return { activeCard, overTarget, isDragging, startDrag, endDrag: clear, toggleSelect, hover, leave, drop, place, clear };
}

export type ActivityBoardControls = ReturnType<typeof useActivityBoard>;
