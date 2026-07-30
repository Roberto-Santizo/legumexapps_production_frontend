import { createContext, type Context } from "react";
import { ToastNotificationProvider, type NotificationAdapter } from "@/features/shared/shared";

interface NotificationHotData {
    notificationContext?: Context<NotificationAdapter | null>;
    notificationProvider?: NotificationAdapter;
}

const hotData = import.meta.hot?.data as NotificationHotData | undefined;
export const NotificationContext: Context<NotificationAdapter | null> =
    hotData?.notificationContext ?? createContext<NotificationAdapter | null>(null);
if (import.meta.hot) import.meta.hot.data.notificationContext = NotificationContext;

const notificationProvider: NotificationAdapter =
    hotData?.notificationProvider ?? new ToastNotificationProvider();
if (import.meta.hot) import.meta.hot.data.notificationProvider = notificationProvider;

export const NotificationProvider = ({ children, container }: { children: React.ReactNode, container: React.ReactNode }) => {
    return (
        <NotificationContext.Provider value={notificationProvider}>
            {container}
            {children}
        </NotificationContext.Provider>
    );
};
