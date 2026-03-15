"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"
import type { NoticePublishTrend } from "./types"

const trendConfig = {
    count: { label: "Total", color: "var(--chart-2)" },
    published: { label: "Published", color: "var(--chart-1)" },
} satisfies ChartConfig

export function NoticePublishTrendChart({ data }: { data: NoticePublishTrend[] }) {
    return (
        <ChartCard title="Publish Trend" description="Monthly notice publishing activity" config={trendConfig}>
            <BarChart data={data} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--chart-2)" radius={[4, 4, 0, 0]} name="Total" />
                <Bar dataKey="published" fill="var(--chart-1)" radius={[4, 4, 0, 0]} name="Published" />
            </BarChart>
        </ChartCard>
    )
}
