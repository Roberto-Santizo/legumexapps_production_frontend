import { useState, type DragEvent } from "react";
import { getMovingKeys, isCardAt, type BoardCard, type BoardTarget } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Options = {
    cards: BoardCard[];
    onMove: (keys: string[], target: BoardTarget) => void;
}

const DRAG_FORMAT = 'text/plain';

export function useActivityBoard({ cards, onMove }: Options) {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [draggingKeys, setDraggingKeys] = useState<string[]>([]);
    const [overTarget, setOverTarget] = useState<BoardTarget | undefined>(undefined);

    const isDragging = draggingKeys.length > 0;
    const activeKeys = isDragging ? draggingKeys : selectedKeys;
    const movingCards = cards.filter((card) => activeKeys.includes(card.key));
    const selectedCards = cards.filter((card) => selectedKeys.includes(card.key));

    const endDrag = () => {
        setDraggingKeys([]);
        setOverTarget(undefined);
    };

    const clear = () => {
        setSelectedKeys([]);
        endDrag();
    };

    const startDrag = (event: DragEvent, key: string) => {
        const keys = getMovingKeys(selectedKeys, key);
        event.dataTransfer.setData(DRAG_FORMAT, keys.join(','));
        event.dataTransfer.effectAllowed = 'move';
        setDraggingKeys(keys);
    };

    const isSelected = (key: string) => selectedKeys.includes(key);

    const toggleSelect = (key: string) =>
        setSelectedKeys((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]));

    const selectMany = (keys: string[]) =>
        setSelectedKeys((prev) => [...prev, ...keys.filter((key) => !prev.includes(key))]);

    const unselectMany = (keys: string[]) =>
        setSelectedKeys((prev) => prev.filter((key) => !keys.includes(key)));

    const hover = (event: DragEvent, target: BoardTarget) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        setOverTarget(target);
    };

    const leave = (event: DragEvent) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOverTarget(undefined);
    };

    const place = (target: BoardTarget) => {
        const keys = movingCards.filter((card) => !isCardAt(card, target)).map((card) => card.key);
        if (keys.length > 0) onMove(keys, target);
        clear();
    };

    const drop = (event: DragEvent, target: BoardTarget) => {
        event.preventDefault();
        place(target);
    };

    return { movingCards, selectedCards, overTarget, isDragging, isSelected, startDrag, endDrag, toggleSelect, selectMany, unselectMany, hover, leave, drop, place, clear };
}

export type ActivityBoardControls = ReturnType<typeof useActivityBoard>;
