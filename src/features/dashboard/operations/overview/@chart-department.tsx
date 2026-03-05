"use client"

import { Pie, PieChart, Cell } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]

const config = {
    count: { label: "Teachers", color: "var(--chart-1)" },
} satisfies ChartConfig

export function OperationsDepartmentChart({ data }: { data: { department: string; count: number }[] }) {
    return (
        <ChartCard title="Department Distribution" description="Teachers by department" config={config}>
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={data} dataKey="count" nameKey="department" innerRadius={50}>
                    {data.map((d, i) => (
                        <Cell key={d.department} fill={COLORS[i % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ChartCard>
    )
}
