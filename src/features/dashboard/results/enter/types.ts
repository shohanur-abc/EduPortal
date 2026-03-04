// ============= TYPES =============
interface ResultRow {
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

interface StudentOption { _id: string; name: string; rollNumber: string }
interface ClassOption { _id: string; name: string; section: string }
