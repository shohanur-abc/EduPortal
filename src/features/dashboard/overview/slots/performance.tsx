import { Attendance } from "@/services"
import { AttendanceDonutChart } from "@/features/dashboard/overview/@donut"
import { ScoreActivityChart } from "@/features/dashboard/overview/score-activity-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export async function OverviewPerformanceSlot() {
    const [todayStats, weeklyTrend] = await Promise.all([
        Attendance.getTodayStats(),
        Attendance.getWeeklyTrend(8),
    ])

    const attendanceDistribution = [
        { status: "present", count: todayStats.present },
        { status: "absent", count: todayStats.absent },
        { status: "late", count: todayStats.late },
        { status: "excused", count: todayStats.excused },
    ].filter((entry) => entry.count > 0)

    const scoreActivityData = weeklyTrend.slice(-7).map((item) => {
        const weeklyTotal = item.present + item.absent + item.late + item.excused
        const rate = weeklyTotal > 0 ? Math.round((item.present / weeklyTotal) * 100) : 0
        return { label: `W${item.week}`, value: rate }
    })

    return (
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
    )
}
