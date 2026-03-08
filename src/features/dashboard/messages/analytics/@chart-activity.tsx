"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"
import type { MessageAnalytics } from "./types"

const activityConfig = {
    count: { label: "Messages", color: "var(--chart-3)" },
} satisfies ChartConfig

export function DailyActivityChart({ data }: { data: MessageAnalytics["dailyActivity"] }) {
    const chartData = data.map((d) => ({
        hour: `${d.hour.toString().padStart(2, "0")}:00`,
        count: d.count,
    }))

    return (
        <ChartCard title="Daily Activity" description="Message distribution by hour of day" config={activityConfig}>
            <BarChart data={chartData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="hour" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--chart-3)" radius={[4, 4, 0, 0]} name="Messages" />
            </BarChart>
        </ChartCard>
    )
}
