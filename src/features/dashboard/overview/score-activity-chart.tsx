"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

export function ScoreActivityChart({ data }: { data: { label: string; value: number }[] }) {
    return (
        <ChartCard
            title="Score Activity"
            description="Weekly attendance performance"
            config={scoreActivityConfig}
            className="h-full"
        >
            <AreaChart data={data} margin={{ left: 8, right: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={false} width={32} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Area type="monotone" dataKey="value" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.2} />
            </AreaChart>
        </ChartCard>
    )
}

const scoreActivityConfig = {
    value: { label: "Attendance", color: "var(--chart-3)" },
} satisfies ChartConfig
