"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const config = {
    present: { label: "Present", color: "var(--chart-1)" },
    absent: { label: "Absent", color: "var(--chart-5)" },
    late: { label: "Late", color: "var(--chart-3)" },
} satisfies ChartConfig

export function AttendanceWeeklyTrendChart({ data }: { data: { week: number; present: number; absent: number; late: number }[] }) {
    const chartData = data.map((d) => ({ ...d, label: `W${d.week}` }))

    return (
        <ChartCard title="Weekly Trend" description="Attendance trend over the past weeks" config={config}>
            <AreaChart data={chartData} className="-ml-5">
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="present" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="absent" stroke="var(--chart-5)" fill="var(--chart-5)" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="late" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
        </ChartCard>
    )
}
