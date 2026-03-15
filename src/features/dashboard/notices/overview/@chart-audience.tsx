"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"
import type { NoticeAudienceCount } from "./types"

const audienceConfig = {
    count: { label: "Notices", color: "var(--chart-4)" },
} satisfies ChartConfig

export function NoticeAudienceChart({ data }: { data: NoticeAudienceCount[] }) {
    const chartData = data.map((d) => ({
        audience: d.audience.charAt(0).toUpperCase() + d.audience.slice(1),
        count: d.count,
    }))

    return (
        <ChartCard title="Audience Reach" description="Notice distribution by target audience" config={audienceConfig}>
            <BarChart data={chartData} layout="vertical" accessibilityLayer>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis dataKey="audience" type="category" tickLine={false} axisLine={false} width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--chart-4)" radius={[0, 4, 4, 0]} name="Notices" />
            </BarChart>
        </ChartCard>
    )
}
