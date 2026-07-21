import { NavLink } from "react-router-dom";

type Props = {
    to: string;
    text: string;
    icon: React.ReactNode;
}

export function CustomNavLink({ text, icon, to }: Props) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `
            group flex items-center gap-3 rounded-xl px-4 py-3
            text-sm font-medium
            transition-all duration-200 ease-out
            ${isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
        `
            }
        >
            <span className="text-lg transition-transform duration-200 group-hover:scale-110">
                {icon}
            </span>

            <span>{text}</span>
        </NavLink>
    )
}
