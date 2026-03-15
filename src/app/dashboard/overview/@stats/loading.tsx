import { DashboardStats } from "@/features/dashboard/overview/@stats";


export default function StatCards() {
    return (
        <DashboardStats stats={{
            studentCount: 22,
            teacherCount: 22,
            classCount: 22,
            activeNotices: 8,
            feesTotal: 1250000,
            feesCollected: 980000,
            attendanceRate: 92.5
        }}
            loading
        />
    )
}