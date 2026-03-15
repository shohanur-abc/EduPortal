import { AttendanceRecordsTable } from "@/features/dashboard/attendance/overview/@table"

export default function TableLoading() {
    return <AttendanceRecordsTable recentRecords={mockRecord} loading={true} />
}

const mockRecord = Array(10).fill(0).map((_, i) => ({
    _id: `record-${i}`,
    studentName: `Jubayer Ahmed`,
    rollNumber: `2025-10A-001`,
    className: `Class 10A`,
    date: '2026-02-26',
    status: 'present',
    remarks: `Lorem ipsum dolor sit amet, `,
}))

