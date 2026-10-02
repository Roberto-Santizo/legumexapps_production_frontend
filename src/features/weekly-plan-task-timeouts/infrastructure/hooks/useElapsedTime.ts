import { useEffect, useState } from "react";
import { getElapsedMilliseconds } from "@/features/weekly-plan-task-timeouts/weekly-plan-task-timeouts";

export function useElapsedTime(startDate: string | null) {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        if (!startDate) return;

        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, [startDate]);

    return startDate ? getElapsedMilliseconds(startDate, now) : 0;
}
