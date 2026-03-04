"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const config = {
    total: { label: "Collection", color: "var(--chart-1)" },
} satisfies ChartConfig

export function FeeMonthlyCollectionChart({ data }: { data: { month: string; total: number; count: number }[] }) {
    return (
        <ChartCard title="Monthly Collection" description="Fee collection trend by month" config={config}>
            <BarChart data={data} className="-ml-5">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="total" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    )
}
