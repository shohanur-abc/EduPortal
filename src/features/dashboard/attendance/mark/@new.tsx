"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig, } from "@/components/ui/chart"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

export const description = "Attendance tracking chart"


export default function AttendanceChart({
    title = "Student Attendance",
    description = "Track student attendance over time",
    chartConfig,
    defaultTab = "present",
    data,
}: AttendanceChartProps) {
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>(defaultTab)
    const tabs = Object.keys(chartConfig) as (keyof typeof chartConfig)[]

    const total = React.useMemo(
        () => {
            const totals = {} as Record<keyof typeof chartConfig, number>
            tabs.forEach((key) => {
                totals[key] = data.reduce((acc, curr) => acc + (curr[key] || 0), 0)
            })
            return totals
        }, [data, tabs])

    return (
        <>
            <Card className="py-0 gap-0">
                <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
                        <CardTitle className="flex gap-2 items-center">{title} <SelectMonth /></CardTitle>
                        <CardDescription>
                            {description}
                        </CardDescription>
                    </div>
                    <div className="flex">
                        {tabs.map((key) => {
                            const chart = key as keyof typeof chartConfig
                            return (
                                <button
                                    key={chart}
                                    data-active={activeChart === chart}
                                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                                    onClick={() => setActiveChart(chart)}
                                >
                                    <span className="text-xs text-muted-foreground">
                                        {chartConfig[chart].label}
                                    </span>
                                    <span className="text-lg leading-none font-bold sm:text-3xl">
                                        {total[key as keyof typeof total].toLocaleString()}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </CardHeader>
                <CardContent className="p-2 sm:px-6 relative">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-60 w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={data}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="w-37"
                                        labelFormatter={(value) => {
                                            return new Date(value).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })
                                        }}
                                    />
                                }
                            />
                            <Bar dataKey={`${activeChart}`} fill={`var(--color-${activeChart})`} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </>
    )
}

const SelectMonth = () => {
    return (
        <Select defaultValue="january">
            <SelectTrigger className="capitalize">
                <SelectValue placeholder="Select a month" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Months</SelectLabel>
                    {["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"].map((month) => (
                        <SelectItem key={month} value={month} className="capitalize">
                            {month}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

interface AttendanceChartProps {
    title: string
    description: string
    chartConfig: ChartConfig
    defaultTab?: keyof ChartConfig
    data: Record<keyof ChartConfig, number>[]
}