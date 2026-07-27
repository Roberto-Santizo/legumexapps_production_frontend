import { createContext } from "react";
import { ToastNotificationProvider, type NotificationAdapter } from "@/features/shared/shared";

export const NotificationContext = createContext<NotificationAdapter | null>(null);
const notificationProvider = new ToastNotificationProvider();

export const NotificationProvider = ({ children, container }: { children: React.ReactNode, container: React.ReactNode }) => {
    return (
        <NotificationContext.Provider value={notificationProvider}>
            {container}
            {children}
        </NotificationContext.Provider>
    );
};
