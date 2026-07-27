import { Box, Database, LayoutDashboard, NotebookIcon, UserCog, type LucideIcon } from "lucide-react";

export type NavItem = {
    to: string;
    text: string;
    icon: LucideIcon;
};

export type NavSection = {
    label: string | null;
    items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
    {
        label: null,
        items: [
            { to: "/dashboard", text: "Dashboard", icon: LayoutDashboard },
        ],
    },
    {
        label: "Operación",
        items: [
            { to: "/lineas", text: "Líneas", icon: NotebookIcon },
            { to: "/posiciones", text: "Posiciones", icon: UserCog },
        ],
    },
    {
        label: "Catálogos",
        items: [
            { to: "/skus", text: "SKUS", icon: Database },
            { to: "/items-material-empaque", text: "Items ME", icon: Box },
        ],
    },
];

const ALL_NAV_ITEMS = NAV_SECTIONS.flatMap(section => section.items);

const SEGMENT_LABELS: Record<string, string> = {
    crear: "Crear",
    editar: "Editar",
};

/**
 * Deriva el breadcrumb a partir de la ruta actual usando NAV_SECTIONS
 * como fuente de verdad. Ej: /lineas/ABC/editar -> ["Líneas", "Editar"]
 */
export function getBreadcrumb(pathname: string): string[] {
    const navItem = ALL_NAV_ITEMS
        .filter(item => pathname === item.to || pathname.startsWith(`${item.to}/`))
        .sort((a, b) => b.to.length - a.to.length)[0];

    if (!navItem) return [];

    const rest = pathname
        .slice(navItem.to.length)
        .split("/")
        .filter(Boolean);

    const crumbs = [navItem.text];

    rest.forEach((segment, index) => {
        if (SEGMENT_LABELS[segment]) {
            crumbs.push(SEGMENT_LABELS[segment]);
        } else if (index === rest.length - 1) {
            crumbs.push("Detalle");
        }
    });

    return crumbs;
}
