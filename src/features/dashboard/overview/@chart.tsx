"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"
import { DashboardStatsData } from "./types"


export function DashboardOverviewChart({ stats }: { stats: DashboardStatsData }) {
    const chartData = [
        { label: "Students", value: stats.studentCount },
        { label: "Teachers", value: stats.teacherCount },
        { label: "Classes", value: stats.classCount },
        { label: "Notices", value: stats.activeNotices },
    ]

    return (
        <ChartCard title="School Overview" description="Current academic year snapshot" config={overviewConfig}>
            <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    )
}


const overviewConfig = {
    students: { label: "Students", color: "var(--primary)" },
    teachers: { label: "Teachers", color: "var(--chart-2)" },
    classes: { label: "Classes", color: "var(--chart-3)" },
} satisfies ChartConfig
