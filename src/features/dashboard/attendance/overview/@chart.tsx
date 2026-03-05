"use client"

import { Pie, PieChart, Cell } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"


export function AttendancePieChart({ data }: { data: { status: string; count: number }[] }) {
    const chartData = data.map((d) => ({ ...d, fill: ATTENDANCE_COLORS[d.status] ?? "var(--chart-2)" }))

    return (
        <ChartCard title="Distribution" description="Attendance status breakdown" config={attendanceConfig}>
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={chartData} dataKey="count" nameKey="status" innerRadius={50}>
                    {chartData.map((d) => (
                        <Cell key={d.status} fill={d.fill} />
                    ))}
                </Pie>
            </PieChart>
        </ChartCard>
    )
}

const ATTENDANCE_COLORS: Record<string, string> = {
    present: "var(--chart-1)",
    absent: "var(--chart-5)",
    late: "var(--chart-3)",
    excused: "var(--chart-4)",
}

const attendanceConfig = {
    present: { label: "Present", color: "var(--chart-1)" },
    absent: { label: "Absent", color: "var(--chart-5)" },
    late: { label: "Late", color: "var(--chart-3)" },
    excused: { label: "Excused", color: "var(--chart-4)" },
} satisfies ChartConfig