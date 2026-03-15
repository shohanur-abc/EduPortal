import { StatCard } from "@/components/molecules/stat-card"
import { SimpleTable } from "@/components/molecules/simple-table"
import { StatusBadge } from "@/components/molecules/status-badge"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import {
    FileBarChart,
    FileText,
    PenLine,
    LineChart,
    CalendarDays,
    DollarSign,
    GraduationCap,
    Settings,
    Database,
    ListFilter,
    Play,
    TrendingUp,
    BarChart3,
    PieChart,
    GitCompareArrows,
} from "@/lib/icon"

// ============= TYPES =============
interface AttendanceReportRow {
    [key: string]: unknown
    date: string
    status: string
    count: number
}

interface FeeReportRow {
    [key: string]: unknown
    status: string
    total: number
    collected: number
    count: number
}

interface ResultReportRow {
    [key: string]: unknown
    exam: string
    subject: string
    avgMarks: number
    count: number
}

// ============= REPORT TYPE DEFINITIONS =============
const REPORT_TYPES = [
    {
        title: "Attendance Reports",
        description: "Daily, weekly, and monthly attendance summaries. Track presence rates, tardiness patterns, and absenteeism trends across classes.",
        icon: CalendarDays,
        variant: "success" as const,
        count: "5 templates",
    },
    {
        title: "Fee Reports",
        description: "Fee collection summaries, outstanding balances, payment trends, and waiver reports. Track financial health at a glance.",
        icon: DollarSign,
        variant: "info" as const,
        count: "4 templates",
    },
    {
        title: "Result Reports",
        description: "Exam performance analysis, subject-wise breakdowns, grade distributions, and comparative studies across terms and sections.",
        icon: GraduationCap,
        variant: "warning" as const,
        count: "6 templates",
    },
    {
        title: "Operations Reports",
        description: "Operational metrics including class utilization, teacher workload distribution, notice engagement, and system activity logs.",
        icon: Settings,
        variant: "default" as const,
        count: "3 templates",
    },
]

// ============= OVERVIEW SECTION =============
export function ReportsOverview() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
                <StatCard
                    title="Attendance"
                    value="5"
                    icon={CalendarDays}
                    variant="success"
                    footer="Report templates"
                />
                <StatCard
                    title="Fees"
                    value="4"
                    icon={DollarSign}
                    variant="info"
                    footer="Report templates"
                />
                <StatCard
                    title="Results"
                    value="6"
                    icon={GraduationCap}
                    variant="warning"
                    footer="Report templates"
                />
                <StatCard
                    title="Operations"
                    value="3"
                    icon={Settings}
                    footer="Report templates"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {REPORT_TYPES.map((rt) => (
                    <Card key={rt.title}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <rt.icon className="size-5" />
                                {rt.title}
                            </CardTitle>
                            <CardDescription>{rt.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Badge variant="secondary">{rt.count}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

// ============= STANDARD REPORTS SECTION =============
export function ReportsStandardSection({
    reportType,
    data,
}: {
    reportType?: string
    data?: AttendanceReportRow[] | FeeReportRow[] | ResultReportRow[]
}) {
    if (reportType === "attendance" && data) {
        return (
            <SimpleTable<AttendanceReportRow>
                title="Attendance Report"
                description="Attendance status breakdown by date"
                columns={[
                    { key: "date", header: "Date" },
                    {
                        key: "status",
                        header: "Status",
                        render: (r) => (
                            <StatusBadge status={r.status as "present" | "absent" | "late" | "excused"} />
                        ),
                    },
                    {
                        key: "count",
                        header: "Count",
                        render: (r) => <Badge variant="outline">{r.count}</Badge>,
                    },
                ]}
                data={data as AttendanceReportRow[]}
                keyExtractor={(r) => `${r.date}-${r.status}`}
            />
        )
    }

    if (reportType === "fees" && data) {
        return (
            <SimpleTable<FeeReportRow>
                title="Fee Collection Report"
                description="Fee collection status and amounts"
                columns={[
                    {
                        key: "status",
                        header: "Status",
                        render: (r) => (
                            <StatusBadge status={r.status as "paid" | "unpaid" | "partial" | "overdue"} />
                        ),
                    },
                    {
                        key: "total",
                        header: "Total Amount",
                        render: (r) => <span className="font-medium">৳{r.total.toLocaleString()}</span>,
                    },
                    {
                        key: "collected",
                        header: "Collected",
                        render: (r) => <span className="text-green-700 dark:text-green-400">৳{r.collected.toLocaleString()}</span>,
                    },
                    {
                        key: "count",
                        header: "Students",
                        render: (r) => <Badge variant="outline">{r.count}</Badge>,
                    },
                ]}
                data={data as FeeReportRow[]}
                keyExtractor={(r) => r.status}
            />
        )
    }

    if (reportType === "results" && data) {
        return (
            <SimpleTable<ResultReportRow>
                title="Result Report"
                description="Exam performance summary by subject"
                columns={[
                    { key: "exam", header: "Exam" },
                    {
                        key: "subject",
                        header: "Subject",
                        render: (r) => <span className="font-medium">{r.subject}</span>,
                    },
                    {
                        key: "avgMarks",
                        header: "Avg. Marks",
                        render: (r) => (
                            <Badge variant={r.avgMarks >= 70 ? "default" : r.avgMarks >= 50 ? "secondary" : "destructive"}>
                                {r.avgMarks}%
                            </Badge>
                        ),
                    },
                    {
                        key: "count",
                        header: "Students",
                        render: (r) => <Badge variant="outline">{r.count}</Badge>,
                    },
                ]}
                data={data as ResultReportRow[]}
                keyExtractor={(r) => `${r.exam}-${r.subject}`}
            />
        )
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="size-5" />
                        Standard Reports
                    </CardTitle>
                    <CardDescription>
                        Select a report type below to generate a pre-built report. Each template is optimized for quick insights.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">18 total templates</Badge>
                        <Badge variant="outline">Ready to generate</Badge>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {REPORT_TYPES.map((rt) => (
                    <Card key={rt.title} className="transition-colors hover:border-primary/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <rt.icon className="size-4" />
                                {rt.title}
                            </CardTitle>
                            <CardDescription className="text-xs">{rt.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Badge variant="secondary">{rt.count}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

// ============= CUSTOM REPORTS SECTION =============
const CUSTOM_REPORT_STEPS = [
    {
        step: 1,
        title: "Select Data Source",
        description: "Choose from available data sources: Attendance, Fees, Results, Students, Teachers, or Classes. Combine multiple sources for cross-referencing.",
        icon: Database,
    },
    {
        step: 2,
        title: "Choose Fields",
        description: "Pick the fields you want in your report. Drag and drop to reorder columns. Add calculated fields for averages, totals, and percentages.",
        icon: ListFilter,
    },
    {
        step: 3,
        title: "Apply Filters",
        description: "Narrow down results with date ranges, class filters, status conditions, and value thresholds. Save filter presets for reuse.",
        icon: Settings,
    },
    {
        step: 4,
        title: "Generate Report",
        description: "Preview your report, then export as PDF, CSV, or Excel. Schedule automatic generation for recurring reports.",
        icon: Play,
    },
]

export function ReportsCustomSection() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PenLine className="size-5" />
                        Custom Report Builder
                    </CardTitle>
                    <CardDescription>
                        Build your own reports from scratch. Follow the steps below to create a tailored report with exactly the data you need.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="gap-1.5">
                            <FileBarChart className="size-3" />
                            4 steps to build
                        </Badge>
                        <Badge variant="secondary">Export as PDF, CSV, Excel</Badge>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {CUSTOM_REPORT_STEPS.map((s) => (
                    <Card key={s.step}>
                        <CardHeader>
                            <div className="flex items-start gap-3">
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                    {s.step}
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <s.icon className="size-4" />
                                        {s.title}
                                    </CardTitle>
                                    <CardDescription>{s.description}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}

// ============= ANALYTICS SECTION =============
const ANALYTICS_ITEMS = [
    {
        title: "Attendance Trends",
        description: "Track attendance patterns over time. Identify seasonal drops, day-of-week trends, and class-wise variations. Compare month-over-month rates.",
        icon: TrendingUp,
        metrics: ["Daily rates", "Weekly averages", "Monthly trends"],
    },
    {
        title: "Fee Collection Trends",
        description: "Monitor fee collection efficiency across months and terms. Spot overdue patterns, track waiver impacts, and forecast collection targets.",
        icon: BarChart3,
        metrics: ["Collection rate", "Outstanding balance", "Payment velocity"],
    },
    {
        title: "Academic Performance",
        description: "Analyze exam results across subjects and terms. View grade distributions, identify at-risk students, and track improvement over time.",
        icon: PieChart,
        metrics: ["Grade distribution", "Subject averages", "Pass rates"],
    },
    {
        title: "Comparative Analysis",
        description: "Compare performance across classes, sections, and terms. Benchmark against institutional averages and identify best-performing groups.",
        icon: GitCompareArrows,
        metrics: ["Class vs class", "Term vs term", "Section rankings"],
    },
]

export function ReportsAnalyticsSection() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <LineChart className="size-5" />
                        Analytics Dashboard
                    </CardTitle>
                    <CardDescription>
                        Interactive analytics with real-time data. Explore trends, compare periods, and discover actionable insights from your institutional data.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">4 analytics modules</Badge>
                        <Badge variant="outline">Real-time data</Badge>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {ANALYTICS_ITEMS.map((item) => (
                    <Card key={item.title} className="transition-colors hover:border-primary/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <item.icon className="size-5" />
                                {item.title}
                            </CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-1.5">
                                {item.metrics.map((m) => (
                                    <Badge key={m} variant="outline" className="text-xs">
                                        {m}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
