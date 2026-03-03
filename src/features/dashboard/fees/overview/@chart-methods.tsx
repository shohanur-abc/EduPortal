"use client"

import { Pie, PieChart, Cell } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]

const config = {
    total: { label: "Amount", color: "var(--chart-1)" },
} satisfies ChartConfig

export function FeePaymentMethodChart({ data }: { data: { method: string; total: number; count: number }[] }) {
    return (
        <ChartCard title="Payment Methods" description="Collection by payment method" config={config}>
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={data} dataKey="total" nameKey="method" innerRadius={50}>
                    {data.map((d, i) => (
                        <Cell key={d.method} fill={COLORS[i % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ChartCard>
    )
}
