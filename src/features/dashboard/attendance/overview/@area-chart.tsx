"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig, } from "@/components/ui/chart"
import { Select } from "@/components/molecules"
// import { useMarkContext } from "@/app/dashboard/attendance/student/layout"

export const description = "Attendance tracking chart"


export default function AttendanceChart({
    classes,
    title = "Student Attendance",
    description = "Track student attendance over time",
    chartConfig,
    defaultTab = "present",
    data,
}: AttendanceChartProps) {
    // const { setSelectedClassId, setSelectedClassSection } = useMarkContext()
    const [selectedClassId, setSelectedClassId] = React.useState<string | null>(null)
    const [selectedClassSection, setSelectedClassSection] = React.useState<string>("")
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>(defaultTab)
    const tabs = Object.keys(chartConfig) as (keyof typeof chartConfig)[]

    const handleClassChange = (classId: string) => {
        const selectedClass = classes.find((cls) => cls._id === classId)
        if (selectedClass) {
            setSelectedClassId(classId)
            setSelectedClassSection(selectedClass.section)
        }
    }

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
                        <CardTitle className="flex gap-2 items-center">{title}
                            <Select
                                label="Class"
                                name="class"
                                options={classes.map((cls) => ({ value: cls._id, label: `${cls.name} - ${cls.section}` }))}
                                defaultValue={classes[0]?._id}
                                onValueChange={handleClassChange}
                                classNames={{ label: 'sr-only', field: 'w-auto' }}
                            />
                        </CardTitle>
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
                            <Bar dataKey={`${activeChart}`} fill={`var(--color-${activeChart})`} >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </>
    )
}


interface AttendanceChartProps {
    classes: {
        _id: string;
        name: string;
        section: string;
        grade: number;
        academicYear: string;
        classTeacherName: string;
        studentCount: number;
        maxStudents: number;
        room: string;
        subjects: string[];
        status: "active" | "inactive";
    }[]
    title: string
    description: string
    chartConfig: ChartConfig
    defaultTab?: keyof ChartConfig
    data: Record<keyof ChartConfig, number>[]
}