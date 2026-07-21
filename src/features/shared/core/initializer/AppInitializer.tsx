import { authRepositoryProvider, login, logout } from "@/features/auth/auth";
import { Loading } from '@/features/shared/shared';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = localStorage.getItem("AUTH_TOKEN");
                const refreshToken = localStorage.getItem("REFRESH_TOKEN");

                if (!token && !refreshToken) {
                    dispatch(logout());
                    return;
                }

                const user = await authRepositoryProvider.checkStatus();
                dispatch(login(user));

            } catch (error) {
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        }
        initAuth();
    });

    if (loading) {
        return <Loading />;
    }

    return <>{children}</>;
}
