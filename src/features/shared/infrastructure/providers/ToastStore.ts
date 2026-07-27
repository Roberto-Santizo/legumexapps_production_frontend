import type { ToastAction, ToastItem, ToastVariant } from "@/features/shared/domain/types/types";

type Listener = () => void;

type ToastInput = {
    variant: ToastVariant;
    message: string;
    description?: string;
    action?: ToastAction;
    duration?: number;
};

type TimerHandle = {
    timeoutId: ReturnType<typeof setTimeout>;
    remaining: number;
    startedAt: number;
};

const DEFAULT_DURATION = 4500;

class ToastStore {
    private toasts: ToastItem[] = [];
    private listeners = new Set<Listener>();
    private timers = new Map<string, TimerHandle>();

    subscribe = (listener: Listener) => {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    };

    getSnapshot = (): ToastItem[] => this.toasts;

    add(input: ToastInput): string {
        const id = crypto.randomUUID();
        const duration = input.duration ?? DEFAULT_DURATION;

        this.toasts = [...this.toasts, { id, duration, ...input }];
        this.emit();
        this.schedule(id, duration);

        return id;
    }

    dismiss(id: string): void {
        this.clearTimer(id);
        this.toasts = this.toasts.filter((toast) => toast.id !== id);
        this.emit();
    }

    pause(id: string): void {
        const timer = this.timers.get(id);
        if (!timer) return;

        clearTimeout(timer.timeoutId);
        timer.remaining -= Date.now() - timer.startedAt;
    }

    resume(id: string): void {
        const timer = this.timers.get(id);
        if (!timer) return;

        this.schedule(id, Math.max(timer.remaining, 0));
    }

    private schedule(id: string, duration: number): void {
        if (!Number.isFinite(duration) || duration <= 0) return;

        const timeoutId = setTimeout(() => this.dismiss(id), duration);
        this.timers.set(id, { timeoutId, remaining: duration, startedAt: Date.now() });
    }

    private clearTimer(id: string): void {
        const timer = this.timers.get(id);
        if (!timer) return;

        clearTimeout(timer.timeoutId);
        this.timers.delete(id);
    }

    private emit(): void {
        this.listeners.forEach((listener) => listener());
    }
}

export const toastStore = new ToastStore();
