"use client"

import { Pie, PieChart, Cell } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const COLORS: Record<string, string> = {
    male: "var(--chart-1)",
    female: "var(--chart-4)",
    unspecified: "var(--chart-3)",
}

const config = {
    count: { label: "Students", color: "var(--chart-1)" },
} satisfies ChartConfig

export function OperationsGenderChart({ data }: { data: { gender: string; count: number }[] }) {
    return (
        <ChartCard title="Gender Distribution" description="Student gender breakdown" config={config}>
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={data} dataKey="count" nameKey="gender" innerRadius={50}>
                    {data.map((d) => (
                        <Cell key={d.gender} fill={COLORS[d.gender] ?? "var(--chart-2)"} />
                    ))}
                </Pie>
            </PieChart>
        </ChartCard>
    )
}
