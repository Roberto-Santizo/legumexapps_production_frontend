import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { BarChartDatum } from "@/features/shared/shared";
import type { TooltipContentProps } from "recharts";

const BAR_COLOR = "#2a78d6";

interface BarChartCardProps {
    title: string;
    data: BarChartDatum[];
}

function ChartTooltip({ active, payload }: TooltipContentProps) {
    if (!active || !payload?.length) return null;

    const { label, value } = payload[0].payload as BarChartDatum;

    return (
        <div className="rounded-xl border border-line bg-surface px-3 py-2 shadow-sm">
            <p className="text-sm font-semibold text-ink">
                {value}
            </p>

            <p className="text-xs text-ink-muted">
                {label}
            </p>
        </div>
    );
}

export function BarChartCard({ title, data }: BarChartCardProps) {
    return (
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <h3 className="mb-5 text-lg font-bold text-ink">
                {title}
            </h3>

            <div className="h-72">
                <ResponsiveContainer>
                    <BarChart data={data} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="var(--color-line)" />

                        <XAxis
                            dataKey="label"
                            axisLine={{ stroke: "var(--color-line-strong)" }}
                            tickLine={false}
                            tick={{ fill: "var(--color-ink-subtle)", fontSize: 12 }}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "var(--color-ink-subtle)", fontSize: 12 }}
                            allowDecimals={false}
                        />

                        <Tooltip cursor={{ fill: "var(--color-canvas)" }} content={ChartTooltip} />

                        <Bar dataKey="value" fill={BAR_COLOR} radius={[4, 4, 0, 0]} maxBarSize={24}>
                            <LabelList
                                dataKey="value"
                                position="top"
                                fill="var(--color-ink-muted)"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
