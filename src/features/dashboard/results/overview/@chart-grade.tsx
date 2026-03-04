"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"


// ============= GRADE DISTRIBUTION CHART =============
export function ResultOverviewCharts({ gradeDistribution }: { gradeDistribution: GradeDistribution[] }) {
    return (
        <ChartCard title="Grade Distribution" description="Number of students per grade" config={gradeConfig}>
            <BarChart data={gradeDistribution} className="-ml-5">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="grade" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    )
}

const gradeConfig = {
    count: { label: "Students", color: "var(--primary)" },
} satisfies ChartConfig
