"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const config = {
    avgMarks: { label: "Avg Marks", color: "var(--chart-2)" },
    passRate: { label: "Pass Rate", color: "var(--chart-1)" },
} satisfies ChartConfig

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]

export function ResultExamComparisonChart({ data }: { data: { exam: string; avgMarks: number; passRate: number; studentCount: number }[] }) {
    return (
        <ChartCard title="Exam Comparison" description="Average marks across exams" config={config}>
            <BarChart data={data} className="-ml-5">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="exam" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="avgMarks" radius={[4, 4, 0, 0]}>
                    {data.map((_, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ChartCard>
    )
}
