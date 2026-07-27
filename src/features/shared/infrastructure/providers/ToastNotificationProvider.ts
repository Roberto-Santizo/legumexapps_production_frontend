import type { NotificationAdapter } from "@/features/shared/domain/interfaces/interfaces";
import { toastStore } from "@/features/shared/infrastructure/providers/ToastStore";

export class ToastNotificationProvider implements NotificationAdapter {
    success(message: string): void {
        toastStore.add({ variant: "success", message });
    }

    error(message: string): void {
        toastStore.add({ variant: "error", message });
    }

    warning(message: string): void {
        toastStore.add({ variant: "warning", message });
    }

    information(message: string): void {
        toastStore.add({ variant: "info", message });
    }

    question(message: string, buttonLabel: string, desc: string, callBack: () => void): void {
        toastStore.add({
            variant: "question",
            message,
            description: desc,
            duration: 8000,
            action: { label: buttonLabel, onClick: callBack },
        });
    }
}
