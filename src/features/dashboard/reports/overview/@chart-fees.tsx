"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const STATUS_COLORS: Record<string, string> = {
    paid: "hsl(142, 71%, 45%)",
    unpaid: "hsl(0, 84%, 60%)",
    partial: "hsl(45, 93%, 47%)",
    overdue: "hsl(280, 67%, 51%)",
}

const chartConfig = {
    total: { label: "Total Amount", color: "var(--primary)" },
    collected: { label: "Collected", color: "hsl(142, 71%, 45%)" },
} satisfies ChartConfig

interface FeeRow {
    status: string
    total: number
    collected: number
    count: number
}

export function FeeReportChart({ data }: { data: FeeRow[] }) {
    return (
        <ChartCard title="Fee Collection Report" description="Total vs collected by status" config={chartConfig}>
            <BarChart data={data} className="-ml-5">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="status" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                    {data.map((entry) => (
                        <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? "var(--primary)"} />
                    ))}
                </Bar>
            </BarChart>
        </ChartCard>
    )
}
