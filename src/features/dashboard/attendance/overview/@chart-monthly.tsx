"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const config = {
    present: { label: "Present", color: "var(--chart-1)" },
    absent: { label: "Absent", color: "var(--chart-5)" },
    late: { label: "Late", color: "var(--chart-3)" },
    excused: { label: "Excused", color: "var(--chart-4)" },
} satisfies ChartConfig

export function AttendanceMonthlyChart({ data }: { data: { month: string; present: number; absent: number; late: number; excused: number }[] }) {
    return (
        <ChartCard title="Monthly Summary" description="Attendance by month" config={config}>
            <BarChart data={data} className="-ml-5">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="present" stackId="a" fill="var(--chart-1)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="absent" stackId="a" fill="var(--chart-5)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="late" stackId="a" fill="var(--chart-3)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="excused" stackId="a" fill="var(--chart-4)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    )
}
