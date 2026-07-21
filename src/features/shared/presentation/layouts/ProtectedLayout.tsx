import { CustomSideBar } from "@/features/shared/shared";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/config/config";

export function ProtectedLayout() {
    const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);

    if (!isSignedIn) {
        return <Navigate to={'/login'} replace />
    }

    return (
        <main className="h-screen grid grid-cols-[auto_1fr] overflow-hidden">
            <aside className="bg-gray-900 text-white h-full">
                <CustomSideBar />
            </aside>

            <section className="h-full w-full overflow-y-auto p-6">
                <Outlet />
            </section>
        </main>
    );
}
