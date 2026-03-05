"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const config = {
    count: { label: "Total", color: "var(--chart-3)" },
    published: { label: "Published", color: "var(--chart-1)" },
} satisfies ChartConfig

export function NoticePublishTrendChart({ data }: { data: { month: string; count: number; published: number }[] }) {
    return (
        <ChartCard title="Publish Trend" description="Notices published over time" config={config}>
            <AreaChart data={data} className="-ml-5">
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="count" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="published" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
        </ChartCard>
    )
}
