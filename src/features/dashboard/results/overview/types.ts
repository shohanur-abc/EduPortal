interface GradeDistribution { grade: string; count: number }
interface SubjectAvg { subject: string; avgMarks: number; totalExams: number }

interface ResultStats {
    totalResults: number
    passRate: number
    subjectCount: number
    topSubject: string | null
    topSubjectAvg: number | null
    loading?: boolean
}

interface ResultRecord {
    [key: string]: unknown
    _id: string
    studentName: string
    rollNumber: string
    className: string
    exam: string
    subject: string
    marks: number
    totalMarks: number
    grade: string
}
