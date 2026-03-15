import { StatCard } from "@/components/molecules/stat-card"
import { GraduationCap, Bell, DollarSign, CheckCircle } from "@/lib/icon"
import { DashboardStatsData } from "./types"

// ============= STAT CARDS =============
export function DashboardStats({ stats, loading = false }: { stats: DashboardStatsData; loading?: boolean }) {
    const collectionRate = stats.feesTotal > 0
        ? Math.round((stats.feesCollected / stats.feesTotal) * 100)
        : 0

    return (
        <>
            <StatCard
                title="Total Students"
                value={stats.studentCount.toLocaleString()}
                icon={GraduationCap}
                trend="up"
                trendValue="+5.2%"
                footer="Active enrolled students"
                variant="info"
                loading={loading}
            />
            <StatCard
                title="Attendance Rate"
                value={`${stats.attendanceRate}%`}
                icon={CheckCircle}
                trend={stats.attendanceRate >= 90 ? "up" : "down"}
                trendValue={stats.attendanceRate >= 90 ? "Good" : "Needs attention"}
                footer="Today's attendance"
                variant={stats.attendanceRate >= 90 ? "success" : "warning"}
                loading={loading}
            />
            <StatCard
                title="Fees Collected"
                value={`৳${stats.feesCollected.toLocaleString()}`}
                icon={DollarSign}
                trend={collectionRate >= 70 ? "up" : "down"}
                trendValue={`${collectionRate}%`}
                footer={`Total: ৳${stats.feesTotal.toLocaleString()}`}
                variant={collectionRate >= 70 ? "success" : "danger"}
                loading={loading}
            />
            <StatCard
                title="Active Notices"
                value={stats.activeNotices}
                icon={Bell}
                footer="Published announcements"
                loading={loading}
            />
        </>
    )
}

