import { DashboardOverviewChart } from "@/features/dashboard/overview/@chart";

export default function Chart() {
    return (
        <DashboardOverviewChart stats={{
            studentCount: 1250,
            teacherCount: 45,
            classCount: 32,
            activeNotices: 8,
            feesTotal: 1250000,
            feesCollected: 980000,
            attendanceRate: 92.5
        }}
        />
    )
}