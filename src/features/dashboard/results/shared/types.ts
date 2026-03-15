export interface ResultRecord {
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

export interface StudentOption { _id: string; name: string; rollNumber: string }
export interface ClassOption { _id: string; name: string; section: string }
