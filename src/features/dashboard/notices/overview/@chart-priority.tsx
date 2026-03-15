"use client"

import { Pie, PieChart, Cell } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const COLORS: Record<string, string> = {
    low: "var(--chart-1)",
    medium: "var(--chart-3)",
    high: "var(--chart-5)",
    urgent: "var(--chart-4)",
}

const config = {
    count: { label: "Notices", color: "var(--chart-1)" },
} satisfies ChartConfig

export function NoticePriorityChart({ data }: { data: { priority: string; count: number }[] }) {
    return (
        <ChartCard title="Priority Breakdown" description="Notices by priority level" config={config}>
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={data} dataKey="count" nameKey="priority" innerRadius={50}>
                    {data.map((d) => (
                        <Cell key={d.priority} fill={COLORS[d.priority] ?? "var(--chart-2)"} />
                    ))}
                </Pie>
            </PieChart>
        </ChartCard>
    )
}
