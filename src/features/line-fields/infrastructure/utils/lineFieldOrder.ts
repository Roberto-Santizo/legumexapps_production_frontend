import type { LineField, LineFieldOrderChange } from "@/features/line-fields/line-fields";

export const nextLineFieldOrder = (assigned: LineField[]): number =>
    assigned.reduce((max, field) => Math.max(max, field.order), 0) + 1;

export const moveLineField = (fields: LineField[], from: number, to: number): LineFieldOrderChange[] => {
    if (to < 0 || to >= fields.length || from === to) return [];

    const list = [...fields];
    const [moved] = list.splice(from, 1);
    list.splice(to, 0, moved);

    return list
        .map((field, index) => ({ id: field.id, order: index + 1, previous: field.order }))
        .filter(change => change.order !== change.previous)
        .map(({ id, order }) => ({ id, order }));
};
