import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bell, LogOut, PanelLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/auth";
import { getBreadcrumb } from "@/features/shared/shared";
import type { AppDispatch, RootState } from "@/config/config";

type Props = {
    onToggleSidebar: () => void;
}

export function CustomHeader({ onToggleSidebar }: Props) {
    const { pathname } = useLocation();
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();

    const crumbs = getBreadcrumb(pathname);

    const onLogout = () => {
        dispatch(logout());
    }

    return (
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-line px-3">
            <button
                type="button"
                onClick={onToggleSidebar}
                className="flex shrink-0 items-center justify-center rounded-md p-1.5 text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
            >
                <PanelLeft className="size-4" />
            </button>

            <nav className="flex min-w-0 items-center gap-1.5 text-[13px]">
                {crumbs.map((crumb, index) => (
                    <span key={crumb} className="flex items-center gap-1.5">
                        {index > 0 && <span className="text-ink-subtle">/</span>}
                        <span className={index === crumbs.length - 1 ? "text-ink" : "text-ink-subtle"}>
                            {crumb}
                        </span>
                    </span>
                ))}
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-1">
                <button
                    type="button"
                    className="flex items-center justify-center rounded-md p-1.5 text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
                >
                    <Bell className="size-4" />
                </button>

                {user && (
                    <Menu as="div" className="relative">
                        <Menu.Button className="flex size-7 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-surface">
                            {user.name[0]}
                        </Menu.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl border border-line bg-surface p-1 shadow-lg focus:outline-none">
                                <div className="px-3 py-2">
                                    <p className="truncate text-sm font-medium text-ink">
                                        {user.name}
                                    </p>
                                    <p className="truncate text-xs text-ink-muted">
                                        {user.role}
                                    </p>
                                </div>

                                <div className="my-1 h-px bg-line" />

                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            onClick={onLogout}
                                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] text-ink transition-colors ${active ? "bg-canvas" : ""
                                                }`}
                                        >
                                            <LogOut className="size-4 text-ink-muted" />
                                            Cerrar sesión
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                )}
            </div>
        </header>
    );
}
