import { ChevronsUpDown } from "lucide-react";
import { CustomNavLink } from "./CustomNavLink";
import { NAV_SECTIONS } from "@/features/shared/shared";

type Props = {
    collapsed?: boolean;
}

export function CustomSideBar({ collapsed = false }: Props) {
    return (
        <aside
            className={`flex h-full shrink-0 flex-col gap-3 overflow-hidden py-3 transition-[width] duration-200 ease-out ${collapsed ? "w-0 px-0" : "w-64 px-3"
                }`}
        >
            <div className="flex h-10 shrink-0 items-center gap-2 px-2">
                <img
                    src="https://legumexappsapi-storage.s3.us-east-1.amazonaws.com/resources/LOGO_LX_V2.png"
                    alt="Logo"
                    className="size-6 object-contain"
                />

                <span className="truncate text-[15px] font-semibold tracking-tight text-ink">
                    Producción
                </span>
            </div>

            <button
                type="button"
                className="flex shrink-0 items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-2 text-[13px] text-ink transition-colors hover:border-line-strong"
            >
                <span className="size-2 shrink-0 rounded-full bg-amber-500" />
                <span className="flex-1 truncate text-left">Producción</span>
                <ChevronsUpDown className="size-3.5 shrink-0 text-ink-subtle" />
            </button>

            <nav className="flex-1 overflow-y-auto">
                {NAV_SECTIONS.map((section, index) => (
                    <div key={section.label ?? index}>
                        {section.label && (
                            <p className="px-3 pb-1 pt-4 text-[11px] font-medium text-ink-subtle">
                                {section.label}
                            </p>
                        )}

                        <ul className="space-y-0.5">
                            {section.items.map(item => (
                                <CustomNavLink
                                    key={item.to}
                                    to={item.to}
                                    text={item.text}
                                    icon={<item.icon />}
                                />
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
