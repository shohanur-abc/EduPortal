"use client"

import * as React from "react"
import { Bar, BarChart, Line, LineChart, CartesianGrid, LabelList, XAxis, YAxis, Area, AreaChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig, } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { chartData, chartData2 } from "../data"
import { TrendingUp } from "lucide-react"
import { percentColor } from "@/lib/utils"


const chartConfig = {
    views: {
        label: "Page Views",
    },
    desktop: {
        label: "Desktop",
        color: "var(--color-present)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--color-absent)",
    },
} satisfies ChartConfig

// Normalize a value to 0-100 based on min/max in a dataset
const normalizeValue = (value: number, dataKey: string, data: typeof chartData) => {
    const values = data.map((d) => d[dataKey as keyof typeof d] as number).filter(Boolean)
    const min = Math.min(...values)
    const max = Math.max(...values)
    return ((value - min) / (max - min)) * 100
}

// Custom dot component to color points based on normalized value
interface DotProps {
    cx?: number
    cy?: number
    payload?: Record<string, number>
    dataKey: "desktop" | "mobile"
}

const ColoredDot = ({ cx = 0, cy = 0, payload, dataKey }: DotProps) => {
    if (!payload || payload[dataKey] === undefined) return null
    const normalized = normalizeValue(payload[dataKey], dataKey, chartData)
    return (
        <circle
            cx={cx}
            cy={cy}
            r={4}
            fill={percentColor(normalized)}
            stroke="white"
            strokeWidth={2}
        />
    )
}

// Custom bar component to color bars based on normalized value
interface BarProps {
    x?: number
    y?: number
    width?: number
    height?: number
    payload?: Record<string, number>
    dataKey: "desktop" | "mobile"
}

const CustomBar = ({ x = 0, y = 0, width = 0, height = 0, payload, dataKey }: BarProps) => {
    if (!payload || payload[dataKey] === undefined) return null
    const normalized = normalizeValue(payload[dataKey], dataKey, chartData)
    const barFill = percentColor(normalized)

    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={barFill}
            rx={4}
        />
    )
}

export default function ChartBarInteractive() {
    return (
        <>
            <AreaChart$ />
            <LineChart$ />
            <BarChart$ />
            <BarChart2$ />
        </>
    )
}


const AreaChart$ = () => {

    const [timeRange, setTimeRange] = React.useState("90d")

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Area Chart - Interactive</CardTitle>
                    <CardDescription>
                        Showing total visitors for the last 3 months
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-60 w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-present)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-present)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-absent)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-absent)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={40}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="mobile"
                            type="natural"
                            fill="url(#fillMobile)"
                            stroke="var(--color-absent)"
                            stackId="a"
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="url(#fillDesktop)"
                            stroke="var(--color-present)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

const LineChart$ = () => {
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("desktop")

    const total = React.useMemo(
        () => ({
            desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
            mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
        }),
        []
    )

    return (
        <Card className="py-4 sm:py-0">
            <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
                    <CardTitle>Line Chart - Interactive</CardTitle>
                    <CardDescription>
                        Showing total visitors for the last 3 months
                    </CardDescription>
                </div>
                <div className="flex">
                    {["desktop", "mobile"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
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
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-62.5 w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
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
                                    className="w-37.5"
                                    nameKey="views"
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
                        {/* <Line
                            dataKey={activeChart}
                            type="monotone"
                            stroke={`var(--color-${activeChart})`}
                            strokeWidth={2}
                            dot={<ColoredDot dataKey={activeChart as "desktop" | "mobile"} />}
                        /> */}
                        <Line
                            dataKey={"desktop"}
                            type="monotone"
                            stroke="var(--color-present)"
                            strokeWidth={2}
                            dot={false}
                        // dot={<ColoredDot dataKey="desktop" />}
                        />
                        <Line
                            dataKey={"mobile"}
                            type="monotone"
                            stroke="var(--color-absent)"
                            strokeWidth={2}
                            dot={false}
                        // dot={<ColoredDot dataKey="mobile" />}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

const BarChart$ = () => {
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("desktop")

    const total = React.useMemo(
        () => ({
            desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
            mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
        }),
        []
    )

    return (
        <Card className="py-0">
            <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
                    <CardTitle>Bar Chart - Interactive</CardTitle>
                    <CardDescription>
                        Showing total visitors for the last 3 months
                    </CardDescription>
                </div>
                <div className="flex">
                    {["desktop", "mobile"].map((key) => {
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
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-60 w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
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
    )
}

const BarChart2$ = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bar Chart - Custom Label</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-50 w-1/2">
                    <BarChart
                        accessibilityLayer
                        data={chartData2}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="desktop" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="desktop"
                            layout="vertical"
                            fill="var(--color-present)"
                            radius={4}
                            maxBarSize={30}
                        >
                            <LabelList
                                dataKey="month"
                                position="insideLeft"
                                offset={8}
                                className="fill-(--color-primary)"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey="desktop"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}