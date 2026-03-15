"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const config = {
    count: { label: "Notices", color: "var(--chart-2)" },
} satisfies ChartConfig

export function NoticeAudienceChart({ data }: { data: { audience: string; count: number }[] }) {
    return (
        <ChartCard title="Audience Distribution" description="Notices by target audience" config={config}>
            <BarChart data={data} className="-ml-5">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="audience" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    )
}
