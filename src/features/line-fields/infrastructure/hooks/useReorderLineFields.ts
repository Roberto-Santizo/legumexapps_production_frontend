import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import { invalidateLineFieldQueries, lineFieldsProvider, moveLineField, type LineField, type LineFieldOrderChange } from "@/features/line-fields/line-fields";

export function useReorderLineFields(lineCode: string) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (changes: LineFieldOrderChange[]) =>
            Promise.all(changes.map(change => lineFieldsProvider.updateLineFieldById(`${change.id}`, { order: change.order }))),
        onError: (err) => notification.error(err.message),
        onSettled: () => invalidateLineFieldQueries(queryClient, lineCode)
    });

    const moveField = (fields: LineField[], from: number, to: number) => {
        const changes = moveLineField(fields, from, to);
        if (changes.length) mutate(changes);
    };

    return { moveField, isReordering: isPending };
}
