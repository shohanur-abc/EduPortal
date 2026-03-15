"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"


// ============= SUBJECT AVERAGE CHART =============
export function SubjectAverageChart({ avgBySubject }: { avgBySubject: SubjectAvg[] }) {
    return (
        <ChartCard title="Subject Averages" description="Average marks by subject" config={subjectConfig}>
            <BarChart data={avgBySubject} className="-ml-5">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="subject" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="avgMarks" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    )
}


const subjectConfig = {
    avgMarks: {
        label: "Average Marks",
        color: "var(--chart-2)"
    },
} satisfies ChartConfig
