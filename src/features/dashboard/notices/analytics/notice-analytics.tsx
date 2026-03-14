"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/molecules/stat-card"
import { SummaryGrid } from "@/components/molecules/summary-grid"
import { MiniTable } from "@/components/molecules/mini-table"
import { StatusBadge } from "@/components/molecules/status-badge"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Pie, PieChart, Cell } from "recharts"
import { ChartCard, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/molecules/chart-card"
import { FileText, Send, Archive, FilePen, TrendingUp, Users, AlertTriangle, Eye } from "@/lib/icon"
import type { NoticeStatusCount, NoticePriorityCount, NoticeAudienceCount, NoticePublishTrend, NoticeExpiringItem } from "../overview/types"

// ============= ANALYTICS DASHBOARD =============
export function NoticeAnalytics({ counts, priorityBreakdown, audienceReach, publishTrend, expiringSoon }: NoticeAnalyticsProps) {
    const total = counts.reduce((a, c) => a + c.count, 0)
    const published = counts.find((c) => c.status === "published")?.count ?? 0
    const drafts = counts.find((c) => c.status === "draft")?.count ?? 0
    const archived = counts.find((c) => c.status === "archived")?.count ?? 0
    const publishRate = total > 0 ? Math.round((published / total) * 100) : 0
    const urgentCount = priorityBreakdown.find((p) => p.priority === "urgent")?.count ?? 0
    const highCount = priorityBreakdown.find((p) => p.priority === "high")?.count ?? 0

    return (
        <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
                <StatCard title="Total Notices" value={total} icon={FileText} variant="info" footer="All-time count" />
                <StatCard title="Published" value={published} icon={Send} variant="success" footer={`${publishRate}% publish rate`} />
                <StatCard title="Pending Review" value={drafts} icon={FilePen} variant="warning" footer="Awaiting publication" />
                <StatCard title="Critical Notices" value={urgentCount + highCount} icon={AlertTriangle} variant="danger" footer={`${urgentCount} urgent, ${highCount} high`} />
            </div>

            {/* Summary Snapshot */}
            <SummaryGrid
                title="Analytics Snapshot"
                description="Key notice board metrics at a glance"
                items={[
                    { label: "Publish Rate", value: `${publishRate}%` },
                    { label: "Active Reach", value: audienceReach.reduce((a, c) => a + c.count, 0) },
                    { label: "Archived", value: archived },
                    { label: "Expiring Soon", value: expiringSoon.length },
                    { label: "Avg/Month", value: publishTrend.length > 0 ? Math.round(publishTrend.reduce((a, c) => a + c.count, 0) / publishTrend.length) : 0 },
                    { label: "Audience Segments", value: audienceReach.length },
                ]}
                columns={3}
            />

            {/* Charts Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <PriorityPieChart data={priorityBreakdown} />
                <AudienceBarChart data={audienceReach} />
            </div>

            {/* Trend + Expiring */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <TrendBarChart data={publishTrend} />
                </div>
                <MiniTable
                    title="Expiring Notices"
                    description="Notices expiring within 7 days"
                    headers={["Title", "Priority", "Expires"]}
                    rows={expiringSoon.map((n) => ({
                        id: n._id,
                        cells: [
                            <span key="t" className="font-medium text-xs line-clamp-1">{n.title}</span>,
                            <StatusBadge key="p" status={n.priority as "low" | "medium" | "high" | "urgent"} />,
                            <span key="e" className="text-xs">{n.expiryDate}</span>,
                        ],
                    }))}
                />
            </div>

            {/* Status Distribution Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Status Distribution</CardTitle>
                    <CardDescription>Breakdown of notices by current status</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        {counts.map((c) => (
                            <div key={c.status} className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <StatusBadge status={c.status as "draft" | "published" | "archived"} />
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold tabular-nums">{c.count}</p>
                                    <p className="text-xs text-muted-foreground">{total > 0 ? Math.round((c.count / total) * 100) : 0}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


// ============= SUB-CHARTS =============
const priorityConfig = {
    low: { label: "Low", color: "var(--chart-1)" },
    medium: { label: "Medium", color: "var(--chart-2)" },
    high: { label: "High", color: "var(--chart-3)" },
    urgent: { label: "Urgent", color: "var(--chart-5)" },
} satisfies ChartConfig

function PriorityPieChart({ data }: { data: NoticePriorityCount[] }) {
    const COLORS: Record<string, string> = { low: "var(--chart-1)", medium: "var(--chart-2)", high: "var(--chart-3)", urgent: "var(--chart-5)" }
    const chartData = data.map((d) => ({ ...d, fill: COLORS[d.priority] ?? "var(--chart-4)" }))

    return (
        <ChartCard title="Priority Breakdown" description="Distribution by urgency level" config={priorityConfig}>
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={chartData} dataKey="count" nameKey="priority" innerRadius={50}>
                    {chartData.map((d) => (
                        <Cell key={d.priority} fill={d.fill} />
                    ))}
                </Pie>
            </PieChart>
        </ChartCard>
    )
}

const audienceConfig = { count: { label: "Notices", color: "var(--chart-4)" } } satisfies ChartConfig

function AudienceBarChart({ data }: { data: NoticeAudienceCount[] }) {
    const chartData = data.map((d) => ({ audience: d.audience.charAt(0).toUpperCase() + d.audience.slice(1), count: d.count }))

    return (
        <ChartCard title="Audience Reach" description="Notices per target audience" config={audienceConfig}>
            <BarChart data={chartData} layout="vertical" accessibilityLayer>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis dataKey="audience" type="category" tickLine={false} axisLine={false} width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--chart-4)" radius={[0, 4, 4, 0]} />
            </BarChart>
        </ChartCard>
    )
}

const trendConfig = { count: { label: "Total", color: "var(--chart-2)" }, published: { label: "Published", color: "var(--chart-1)" } } satisfies ChartConfig

function TrendBarChart({ data }: { data: NoticePublishTrend[] }) {
    return (
        <ChartCard title="Monthly Publish Trend" description="Notice creation over time" config={trendConfig}>
            <BarChart data={data} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="published" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ChartCard>
    )
}

// ============= TYPES =============
interface NoticeAnalyticsProps {
    counts: NoticeStatusCount[]
    priorityBreakdown: NoticePriorityCount[]
    audienceReach: NoticeAudienceCount[]
    publishTrend: NoticePublishTrend[]
    expiringSoon: NoticeExpiringItem[]
}
