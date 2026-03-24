import { auth } from "@/lib/auth"
import { AttendanceDonutChart } from "./@donut"
import { ScoreActivityChart } from "./score-activity-chart"
import { Attendance, Dashboard, Fee, Message, Notice, Result } from "@/services"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { SimpleTable } from "@/components/molecules/simple-table"
import { StatCard } from "@/components/molecules/stat-card"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { StatusBadge } from "@/components/molecules/status-badge"
import { CalendarDays, CheckCircle2, ClipboardList, MessageSquare, Trophy } from "@/lib/icon"

export async function DashboardOverviewPage() {
    const session = await auth()
    const userName = session?.user?.name ?? "User"
    const userEmail = session?.user?.email ?? ""
    const userImage = session?.user?.image ?? undefined

    const [
        stats,
        todayStats,
        weeklyTrend,
        subjectPerformance,
        recentNotices,
        recentResults,
        feeTotals,
        paymentMethods,
        monthlyCollection,
        messageOverview,
        messageAnalytics,
    ] = await Promise.all([
        Dashboard.stats(),
        Attendance.getTodayStats(),
        Attendance.getWeeklyTrend(8),
        Result.getSubjectWisePerformance(),
        Notice.getRecent(8),
        Result.getRecent(8),
        Fee.feeTotals(),
        Fee.paymentMethodBreakdown(),
        Fee.monthlyCollection(),
        Message.getOverview(),
        Message.getAnalytics(),
    ])

    const completionRate = feeTotals.total > 0 ? Math.round((feeTotals.collected / feeTotals.total) * 100) : 0
    const monthlyAverage = monthlyCollection.length > 0
        ? Math.round(monthlyCollection.reduce((sum, item) => sum + item.total, 0) / monthlyCollection.length)
        : 0

    const totalPaymentRecords = paymentMethods.reduce((sum, item) => sum + item.count, 0)

    const attendanceDistribution = [
        { status: "present", count: todayStats.present },
        { status: "absent", count: todayStats.absent },
        { status: "late", count: todayStats.late },
        { status: "excused", count: todayStats.excused },
    ].filter((entry) => entry.count > 0)

    const scoreActivityData = weeklyTrend.slice(-7).map((item) => {
        const weeklyTotal = item.present + item.absent + item.late + item.excused
        const rate = weeklyTotal > 0 ? Math.round((item.present / weeklyTotal) * 100) : 0

        return {
            label: `W${item.week}`,
            value: rate,
        }
    })

    const subjectData = subjectPerformance
        .slice()
        .sort((a, b) => b.passRate - a.passRate)
        .slice(0, 6)

    const agendaItems = recentNotices.slice(0, 4)
    const senderItems = messageAnalytics.topSenders.slice(0, 4)

    const assignmentRows = recentResults.map((item) => {
        const scorePercent = item.totalMarks > 0 ? Math.round((item.marks / item.totalMarks) * 100) : 0
        return {
            ...item,
            scorePercent,
            status: scorePercent >= 80 ? "completed" : scorePercent >= 50 ? "in progress" : "needs review",
        }
    })

    return (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div className="space-y-4 xl:col-span-9">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                    <Card className="lg:col-span-6">
                        <CardContent className="flex items-center gap-4 pt-6">
                            <Avatar className="size-16 border">
                                <AvatarImage src={userImage} alt={userName} />
                                <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h2 className="text-lg font-semibold">Welcome, {userName}</h2>
                                <p className="text-sm text-muted-foreground">Overview of attendance, academic progress, and communication activity.</p>
                                <p className="text-xs text-muted-foreground">{userEmail}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4 lg:col-span-6">
                        <StatCard title="Attendance" value={`${stats.attendanceRate}%`} icon={CheckCircle2} variant="success" footer="Today" />
                        <StatCard title="Tasks Completed" value={completionRate} icon={ClipboardList} footer="Fee collection rate" />
                        <StatCard title="Task In Progress" value={stats.activeNotices} icon={CalendarDays} footer="Active notices" />
                        <StatCard title="Reward Points" value={messageOverview.totalMessages} icon={Trophy} footer="Messages sent" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                    <Card className="lg:col-span-4">
                        <CardHeader>
                            <CardTitle>Performance</CardTitle>
                            <CardDescription>Today&apos;s attendance distribution</CardDescription>
                        </CardHeader>
                        <CardContent className="h-72">
                            <AttendanceDonutChart data={attendanceDistribution} />
                        </CardContent>
                    </Card>
                    <div className="lg:col-span-8">
                        <ScoreActivityChart data={scoreActivityData} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                    <Card className="lg:col-span-4">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest school notices</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recentNotices.slice(0, 6).map((item) => (
                                <div key={item._id} className="space-y-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className="text-sm font-medium leading-snug">{item.title}</p>
                                        <StatusBadge status={item.priority as "low" | "medium" | "high" | "urgent"} />
                                    </div>
                                    <p className="text-xs text-muted-foreground">{item.publishDate}</p>
                                    <Separator />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-8">
                        <CardHeader>
                            <CardTitle>Grade by Subject</CardTitle>
                            <CardDescription>Pass-rate trend across subjects</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {subjectData.map((item) => (
                                <div key={item.subject} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{item.subject}</span>
                                        <span className="text-sm text-muted-foreground">{item.passRate}%</span>
                                    </div>
                                    <Progress value={item.passRate} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <SimpleTable
                    title="Assignments"
                    description="Recent result records"
                    columns={[
                        { key: "studentName", header: "Student", render: (row) => <AvatarCell name={String(row.studentName)} secondary={String(row.className)} /> },
                        { key: "subject", header: "Subject" },
                        { key: "exam", header: "Exam" },
                        { key: "scorePercent", header: "Score", render: (row) => `${Number(row.scorePercent)}%` },
                        {
                            key: "status",
                            header: "Status",
                            render: (row) => (
                                <Badge variant="outline" className="capitalize">{String(row.status)}</Badge>
                            ),
                        },
                    ]}
                    data={assignmentRows}
                    keyExtractor={(row) => String(row._id)}
                />
            </div>

            <div className="space-y-4 xl:col-span-3">
                <Card>
                    <CardContent className="px-3">
                        <Calendar mode="single" className="w-full rounded-md" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Agenda</CardTitle>
                        <CardDescription>Upcoming notice timeline</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {agendaItems.map((item) => (
                            <div key={item._id} className="rounded-md border p-3">
                                <p className="text-sm font-medium leading-snug">{item.title}</p>
                                <p className="mt-1 text-xs text-muted-foreground">{item.publishDate}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Messages</CardTitle>
                        <CardDescription>Top active senders</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {senderItems.map((item) => (
                            <div key={item._id} className="flex items-center justify-between gap-2">
                                <AvatarCell name={item.name} secondary={item.role} image={item.image} className="gap-2" />
                                <Badge variant="secondary" className="gap-1">
                                    <MessageSquare className="size-3" />
                                    {item.count}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Finance Snapshot</CardTitle>
                        <CardDescription>Collection summary</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Monthly Avg</span>
                            <span>৳{monthlyAverage.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Payment Methods</span>
                            <span>{paymentMethods.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Total Records</span>
                            <span>{totalPaymentRecords.toLocaleString()}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
