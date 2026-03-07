import { ReportKpi } from "@/features/dashboard/reports/overview/@kpi"
import { Report } from "@/services"

export default async function ReportKpiPage() {
    const [attendance, fees, results] = await Promise.all([
        Report.attendanceReport(),
        Report.feeReport(),
        Report.resultReport(),
    ])

    const totalAttendance = attendance.reduce((s, r) => s + r.count, 0)
    const presentCount = attendance.filter((r) => r.status === "present").reduce((s, r) => s + r.count, 0)
    const avgAttendanceRate = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0

    const totalFee = fees.reduce((s, r) => s + r.total, 0)
    const collectedFee = fees.reduce((s, r) => s + r.collected, 0)
    const feeCollectionRate = totalFee > 0 ? Math.round((collectedFee / totalFee) * 100) : 0

    const totalMarks = results.reduce((s, r) => s + r.avgMarks * r.count, 0)
    const totalStudents = results.reduce((s, r) => s + r.count, 0)
    const avgResultMarks = totalStudents > 0 ? Math.round(totalMarks / totalStudents) : 0

    const totalDataPoints = attendance.length + fees.length + results.length

    return (
        <ReportKpi
            avgAttendanceRate={avgAttendanceRate}
            feeCollectionRate={feeCollectionRate}
            avgResultMarks={avgResultMarks}
            totalDataPoints={totalDataPoints}
        />
    )
}
