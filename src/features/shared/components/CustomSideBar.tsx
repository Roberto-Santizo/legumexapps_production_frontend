import { Box, Database, LayoutDashboard, LogOut, NotebookIcon, UserCog, Users } from "lucide-react";
import { logout } from "@/features/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { CustomNavLink } from "./CustomNavLink";
import type { AppDispatch, RootState } from "@/config/config";

export function CustomSideBar() {
  const user = useSelector((state: RootState) => state.auth.user)!;
  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(logout());
  }

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-20 items-center px-6">
        <img
          src="https://legumexappsapi-storage.s3.us-east-1.amazonaws.com/resources/LOGO_LX_V2.png"
          alt="Logo"
          className="h-10 w-10 object-contain"
        />

        <div className="ml-3">
          <h1 className="font-semibold text-gray-900">
            Producción
          </h1>

          <p className="text-xs text-gray-500">
            Plataforma de Producción
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4">
        <ul className="space-y-3 pb-4">
          <CustomNavLink to="/dashboard" text="Dashboard" icon={<LayoutDashboard />} />
          <CustomNavLink to="/usuarios" text="Usuarios" icon={<Users />} />
          <CustomNavLink to="/lineas" text="Lineas" icon={<NotebookIcon />} />
          <CustomNavLink to="/posiciones" text="Posiciones" icon={<UserCog />} />
          <CustomNavLink to="/skus" text="SKUS" icon={<Database />} />
          <CustomNavLink to="/items-material-empaque" text="Items ME" icon={<Box />} />
        </ul>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
            {user.name[0]}
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-gray-900">
              {user.name}
            </p>

            <p className="truncate text-xs text-gray-500">
              {user.role}
            </p>
          </div>

          <button className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-500">
            <LogOut onClick={() => onLogout()} size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
