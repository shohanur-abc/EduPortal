import { AttendanceReportTable } from "@/features/dashboard/attendance/reports/@table"

export default function TableLoading() {
    return <AttendanceReportTable records={records} loading={true} />
}

const records = Array(10).fill(0).map((_, i) => ({
    _id: `record-${i + 1}`,
    studentName: `Jubayer Ahmed`,
    rollNumber: `2025-10A-00${i + 1}`,
    className: `Class 6 A`,
    date: `2024-09-${(i % 30) + 1}`,
    status: Math.random() > 0.8 ? "Absent" : Math.random() > 0.5 ? "Late" : "Present",
    remarks: Math.random() > 0.7 ? "Sick leave" : "",
}))