"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"
import type { MessageAnalytics } from "./types"

const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const trendConfig = {
    count: { label: "Messages", color: "var(--chart-1)" },
} satisfies ChartConfig

export function MessageTrendChart({ data }: { data: MessageAnalytics["messageTrend"] }) {
    const chartData = data.map((d) => ({
        month: MONTHS[d.month] ?? d.month,
        count: d.count,
    }))

    return (
        <ChartCard title="Message Trend" description="Monthly messaging activity" config={trendConfig}>
            <BarChart data={chartData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--chart-1)" radius={[4, 4, 0, 0]} name="Messages" />
            </BarChart>
        </ChartCard>
    )
}
