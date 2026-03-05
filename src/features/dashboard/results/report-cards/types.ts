
interface ReportCardStats {
    uniqueStudents: number
    passRate: number
    avgMarks: number
}


interface StudentSummary {
    [key: string]: unknown
    studentName: string
    rollNumber: string
    className: string
    subjects: number
    totalMarks: number
    obtainedMarks: number
    percentage: number
    hasFail: boolean
}