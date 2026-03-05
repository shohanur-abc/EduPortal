"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const chartConfig = {
    avgMarks: { label: "Avg Marks", color: "var(--primary)" },
} satisfies ChartConfig

interface ResultRow {
    exam: string
    subject: string
    avgMarks: number
    count: number
}

export function ResultReportChart({ data }: { data: ResultRow[] }) {
    // Aggregate average marks per subject across all exams
    const subjectMap = data.reduce<Record<string, { total: number; count: number }>>((acc, d) => {
        acc[d.subject] = acc[d.subject] ?? { total: 0, count: 0 }
        acc[d.subject].total += d.avgMarks * d.count
        acc[d.subject].count += d.count
        return acc
    }, {})

    const chartData = Object.entries(subjectMap).map(([subject, v]) => ({
        subject,
        avgMarks: Math.round(v.total / v.count),
    }))

    return (
        <ChartCard title="Result Report" description="Average marks by subject" config={chartConfig}>
            <BarChart data={chartData} className="-ml-5">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="subject" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} domain={[0, 100]} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="avgMarks" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    )
}
