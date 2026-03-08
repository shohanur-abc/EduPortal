"use client"

import { Pie, PieChart, Cell } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"
import type { NoticePriorityCount } from "./types"

const PRIORITY_COLORS: Record<string, string> = {
    low: "var(--chart-1)",
    medium: "var(--chart-2)",
    high: "var(--chart-3)",
    urgent: "var(--chart-5)",
}

const priorityConfig = {
    low: { label: "Low", color: "var(--chart-1)" },
    medium: { label: "Medium", color: "var(--chart-2)" },
    high: { label: "High", color: "var(--chart-3)" },
    urgent: { label: "Urgent", color: "var(--chart-5)" },
} satisfies ChartConfig

export function NoticePriorityChart({ data }: { data: NoticePriorityCount[] }) {
    const chartData = data.map((d) => ({
        ...d,
        fill: PRIORITY_COLORS[d.priority] ?? "var(--chart-4)",
    }))

    return (
        <ChartCard title="Priority Distribution" description="Notices by priority level" config={priorityConfig}>
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={chartData} dataKey="count" nameKey="priority" innerRadius={50}>
                    {chartData.map((d) => (
                        <Cell key={d.priority} fill={d.fill} />
                    ))}
                </Pie>
            </PieChart>
        </ChartCard>
    )
}
