import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import type { CaptureField } from "@/features/capture-fields/capture-fields";
import { invalidateLineFieldQueries, lineFieldsProvider, nextLineFieldOrder, toAssignLineFieldPayload, type LineField } from "@/features/line-fields/line-fields";

export function useAssignLineField(lineCode: string) {
    const notification = useNotification();
    const queryClient = useQueryClient();

    const { mutate, isPending, variables } = useMutation({
        mutationFn: ({ field, assigned }: { field: CaptureField; assigned: LineField[] }) =>
            lineFieldsProvider.assignLineField(lineCode, toAssignLineFieldPayload(field, nextLineFieldOrder(assigned))),
        onSuccess: (message) => {
            notification.success(message);
            invalidateLineFieldQueries(queryClient, lineCode);
        },
        onError: (err) => notification.error(err.message)
    });

    const assignField = (field: CaptureField, assigned: LineField[]) => mutate({ field, assigned });

    return { assignField, isAssigning: isPending, assigningId: isPending ? variables?.field.id : undefined };
}
