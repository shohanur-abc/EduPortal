"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const collectionChartConfig = {
    total: { label: "Collection", color: "var(--chart-1)" },
} satisfies ChartConfig

export function FeesCollectionBarChart({ data }: { data: { month: string; total: number }[] }) {
    return (
        <ChartCard title="Monthly Fee Collection" description="Collected amount by month" config={collectionChartConfig}>
            <BarChart data={data} className="-ml-5">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `৳${Math.round(value / 1000)}k`} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="total" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    )
}
