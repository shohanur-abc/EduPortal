interface AttendanceReportStats {
    total: number
    presentCount: number
    absentCount: number
    lateCount: number
    attendanceRate: number
    loading?: boolean
}

interface AttendanceRecord {
    [key: string]: unknown
    _id: string
    studentName: string
    rollNumber: string
    className: string
    date: string
    status: string
    remarks: string
}
