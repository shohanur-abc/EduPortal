"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const expenseChartConfig = {
    amount: { label: "Amount", color: "var(--chart-2)" },
} satisfies ChartConfig

export function SchoolExpensesBarChart({ data }: { data: { category: string; amount: number }[] }) {
    return (
        <ChartCard title="Expense by Category" description="Total amount spent for each category" config={expenseChartConfig}>
            <BarChart data={data} className="-ml-5">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="category" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="amount" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    )
}
