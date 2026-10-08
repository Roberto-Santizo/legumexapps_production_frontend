import type { Option } from "@/features/shared/shared";
import type { Timeout } from "@/features/timeouts/timeouts";

export const timeoutOptions = (timeouts: Timeout[]): Option[] =>
    timeouts.map(timeout => ({ value: timeout.id, label: timeout.name }));
