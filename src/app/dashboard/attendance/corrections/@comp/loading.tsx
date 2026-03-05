import { AttendanceCorrections } from "@/features/dashboard/attendance/corrections/@comp";

export default function CompLoading() {
    return (
        <AttendanceCorrections records={mockRecords} loading />
    )
}

const mockRecords = Array(10).fill(0).map((_, idx) => ({
    _id: `mock-${idx}`,
    studentName: 'Jubayer Ahmed',
    rollNumber: '2025-10A-001',
    className: 'Class 7 A',
    date: 'Feb 26, 2026',
    status: 'present',
    remarks: 'lorem ipsum ',
}))