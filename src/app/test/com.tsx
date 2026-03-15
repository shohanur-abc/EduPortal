"use client"

import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
    BarChart, Bar,
    LineChart, Line,
    AreaChart, Area,
    PieChart, Pie,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ScatterChart, Scatter,
    CartesianGrid, XAxis, YAxis,
    Legend,
    Cell,
} from "recharts"
import {
    ChartContainer,
    ChartTooltip, ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { Select } from "@/components/molecules"

// ==================== Types ====================

export type DataPoint = Record<string, string | number>

export type ChartType = "line" | "bar" | "area" | "pie" | "radar" | "scatter"

export interface DataSeries {
    key: string
    label: string
    color?: string
}

export interface ChartProps {
    data: DataPoint[]
    series: DataSeries[]
    type: ChartType
    /** Key used for the X-axis / category labels */
    xAxisKey?: string
    className?: string
    height?: number
    showGrid?: boolean
    showLegend?: boolean
    showTooltip?: boolean
    /** Stack series on top of each other (area / bar only) */
    stacked?: boolean
    /** Donut hole for pie charts (0 = full filled pie) */
    innerRadius?: number
    outerRadius?: number
}

// ==================== Palette ====================

const DEFAULT_COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "#7c3aed",
    "#db2777",
    "#65a30d",
]

const resolveColor = (s: DataSeries, idx: number) =>
    s.color ?? DEFAULT_COLORS[idx % DEFAULT_COLORS.length]

const buildConfig = (series: DataSeries[]): ChartConfig =>
    series.reduce(
        (acc, s, idx) => {
            acc[s.key] = { label: s.label, color: resolveColor(s, idx) }
            return acc
        },
        {} as ChartConfig,
    )

// ==================== Chart ====================

export const Chart: React.FC<ChartProps> = ({
    data,
    series,
    type,
    xAxisKey = "name",
    className,
    height = 300,
    showGrid = true,
    showLegend = true,
    showTooltip = true,
    stacked = false,
    innerRadius = 0,
    outerRadius = 80,
}) => {
    const config = buildConfig(series)

    const commonProps = {
        data,
        margin: { top: 10, right: 20, left: 0, bottom: 0 },
    }

    const axisProps = {
        tickLine: false,
        axisLine: false,
        tickMargin: 8,
    }

    const tooltip = showTooltip
        ? <ChartTooltip content={<ChartTooltipContent />} />
        : null

    const legend = showLegend ? <Legend /> : null

    const grid = showGrid
        ? <CartesianGrid strokeDasharray="3 3" vertical={false} />
        : null

    const renderInner = (): React.ReactElement => {
        switch (type) {
            case "line":
                return (
                    <LineChart {...commonProps} accessibilityLayer>
                        {grid}
                        <XAxis dataKey={xAxisKey} {...axisProps} tickFormatter={(v) => String(v).slice(0, 3)} />
                        <YAxis {...axisProps} width={40} />
                        {tooltip}
                        {legend}
                        {series.map((s, idx) => (
                            <Line
                                key={s.key}
                                type="monotone"
                                dataKey={s.key}
                                stroke={resolveColor(s, idx)}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 5 }}
                            />
                        ))}
                    </LineChart>
                )

            case "bar":
                return (
                    <BarChart {...commonProps} accessibilityLayer>
                        {grid}
                        <XAxis dataKey={xAxisKey} {...axisProps} tickFormatter={(v) => String(v).slice(0, 3)} />
                        <YAxis {...axisProps} width={40} />
                        {tooltip}
                        {legend}
                        {series.map((s, idx) => (
                            <Bar
                                key={s.key}
                                dataKey={s.key}
                                fill={resolveColor(s, idx)}
                                radius={[4, 4, 0, 0]}
                                stackId={stacked ? "stack" : undefined}
                            />
                        ))}
                    </BarChart>
                )

            case "area":
                return (
                    <AreaChart {...commonProps} accessibilityLayer>
                        {grid}
                        <XAxis dataKey={xAxisKey} {...axisProps} tickFormatter={(v) => String(v).slice(0, 3)} />
                        <YAxis {...axisProps} width={40} />
                        {tooltip}
                        {legend}
                        {series.map((s, idx) => {
                            const color = resolveColor(s, idx)
                            return (
                                <Area
                                    key={s.key}
                                    type="monotone"
                                    dataKey={s.key}
                                    fill={color}
                                    stroke={color}
                                    stackId={stacked ? "stack" : undefined}
                                    fillOpacity={0.4}
                                />
                            )
                        })}
                    </AreaChart>
                )

            case "pie":
                return (
                    <PieChart>
                        {tooltip}
                        {legend}
                        {series.map((s) => (
                            <Pie
                                key={s.key}
                                data={data}
                                dataKey={s.key}
                                nameKey={xAxisKey}
                                cx="50%"
                                cy="50%"
                                innerRadius={innerRadius}
                                outerRadius={outerRadius}
                                paddingAngle={2}
                                label={({ name, percent }: { name: string; percent: number }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                }
                                labelLine={false}
                            >
                                {data.map((_, i) => (
                                    <Cell
                                        key={`cell-${i}`}
                                        fill={DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        ))}
                    </PieChart>
                )

            case "radar":
                return (
                    <RadarChart {...commonProps} cx="50%" cy="50%">
                        <PolarGrid />
                        <PolarAngleAxis dataKey={xAxisKey} {...axisProps} />
                        <PolarRadiusAxis tick={false} axisLine={false} />
                        {tooltip}
                        {legend}
                        {series.map((s, idx) => {
                            const color = resolveColor(s, idx)
                            return (
                                <Radar
                                    key={s.key}
                                    name={s.label}
                                    dataKey={s.key}
                                    stroke={color}
                                    fill={color}
                                    fillOpacity={0.4}
                                />
                            )
                        })}
                    </RadarChart>
                )

            case "scatter":
                return (
                    <ScatterChart {...commonProps} accessibilityLayer>
                        {grid}
                        <XAxis dataKey={xAxisKey} type="number" {...axisProps} width={40} />
                        <YAxis {...axisProps} width={40} />
                        {tooltip}
                        {legend}
                        {series.map((s, idx) => (
                            <Scatter
                                key={s.key}
                                name={s.label}
                                dataKey={s.key}
                                fill={resolveColor(s, idx)}
                            />
                        ))}
                    </ScatterChart>
                )
        }
    }

    return (
        <ChartContainer config={config} className={className} style={{ minHeight: height }}>
            {renderInner()}
        </ChartContainer>
    )
}

export default Chart

// ==================== Chart with Type Switcher ====================

const CHART_TYPE_OPTIONS: { label: string; value: string }[] = [
    { label: "Line", value: "line" },
    { label: "Bar", value: "bar" },
    { label: "Area", value: "area" },
    { label: "Pie", value: "pie" },
    { label: "Radar", value: "radar" },
    { label: "Scatter", value: "scatter" },
]

export interface ChartWithSelectorProps extends Omit<ChartProps, "type"> {
    defaultType?: ChartType
    selectorLabel?: string
}

export const ChartWithSelector: React.FC<ChartWithSelectorProps> = ({
    defaultType = "line",
    selectorLabel = "Chart Type",
    ...chartProps
}) => {
    const form = useForm<{ chartType: ChartType }>({
        defaultValues: { chartType: defaultType },
    })
    const chartType = form.watch("chartType")

    return (
        <div className="space-y-4">
            <FormProvider {...form}>
                <div className="max-w-45">
                    <Select
                        name="chartType"
                        label={selectorLabel}
                        placeholder="Select type…"
                        options={CHART_TYPE_OPTIONS}
                        classNames={{ item: "" }}
                    />
                </div>
            </FormProvider>
            <Chart {...chartProps} type={chartType} />
        </div>
    )
}
