"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const STATUS_COLORS: Record<string, string> = {
    present: "hsl(142, 71%, 45%)",
    absent: "hsl(0, 84%, 60%)",
    late: "hsl(45, 93%, 47%)",
    excused: "hsl(221, 83%, 53%)",
}

const chartConfig = {
    count: { label: "Count", color: "var(--primary)" },
} satisfies ChartConfig

export function AttendanceReportChart({ data }: { data: { status: string; count: number }[] }) {
    const aggregated = data.reduce<Record<string, number>>((acc, d) => {
        acc[d.status] = (acc[d.status] ?? 0) + d.count
        return acc
    }, {})

    const chartData = Object.entries(aggregated).map(([status, count]) => ({ status, count }))

    return (
        <ChartCard title="Attendance Report" description="Status distribution from report data" config={chartConfig}>
            <BarChart data={chartData} className="-ml-5">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="status" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry) => (
                        <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? "var(--primary)"} />
                    ))}
                </Bar>
            </BarChart>
        </ChartCard>
    )
}
