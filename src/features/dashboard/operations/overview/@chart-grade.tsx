"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const config = {
    totalStudents: { label: "Students", color: "var(--chart-1)" },
    sections: { label: "Sections", color: "var(--chart-2)" },
} satisfies ChartConfig

export function OperationsGradeChart({ data }: { data: { grade: number; sections: number; totalStudents: number; totalCapacity: number }[] }) {
    return (
        <ChartCard title="Grade Distribution" description="Students and sections per grade" config={config}>
            <BarChart data={data} className="-ml-5">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="grade" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `Grade ${v}`} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="totalStudents" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    )
}
