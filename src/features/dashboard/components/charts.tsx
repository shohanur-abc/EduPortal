"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"

// ============= OVERVIEW BAR CHART =============
const overviewConfig = {
    students: { label: "Students", color: "var(--primary)" },
    teachers: { label: "Teachers", color: "var(--chart-2)" },
    classes: { label: "Classes", color: "var(--chart-3)" },
} satisfies ChartConfig

export function OverviewBarChart({ data }: { data: { label: string; value: number }[] }) {
    return (
        <ChartCard title="School Overview" description="Current academic year snapshot" config={overviewConfig}>
            <BarChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    )
}


// ============= ROLE DISTRIBUTION CHART =============
const roleConfig = {
    count: { label: "Users", color: "var(--primary)" },
} satisfies ChartConfig

export function RoleDistributionChart({ data }: { data: { role: string; count: number }[] }) {
    return (
        <ChartCard title="Users by Role" description="Distribution of users across roles" config={roleConfig}>
            <BarChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="role" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    )
}
