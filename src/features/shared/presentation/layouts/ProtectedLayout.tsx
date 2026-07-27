import { useState } from "react";
import { CustomHeader, CustomSideBar } from "@/features/shared/shared";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/config/config";

export function ProtectedLayout() {
    const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
    const [collapsed, setCollapsed] = useState(false);

    if (!isSignedIn) {
        return <Navigate to={'/login'} replace />
    }

    return (
        <div className="flex h-screen overflow-hidden bg-canvas text-ink">
            <CustomSideBar collapsed={collapsed} />

            <div className="flex min-w-0 flex-1 flex-col py-2 pr-2">
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                    <CustomHeader onToggleSidebar={() => setCollapsed(c => !c)} />

                    <div className="flex-1 overflow-y-auto px-8 py-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
