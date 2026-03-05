"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"


// ============= FEE STATUS BAR CHART =============
const feeConfig = {
    count: { label: "Records", color: "var(--primary)" },
} satisfies ChartConfig

export function FeeStatusBarChart({ data }: { data: { status: string; count: number }[] }) {
    return (
        <ChartCard title="Fee Status Breakdown" description="Number of records by payment status" config={feeConfig}>
            <BarChart data={data} className="-ml-5">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="status" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    )
}



