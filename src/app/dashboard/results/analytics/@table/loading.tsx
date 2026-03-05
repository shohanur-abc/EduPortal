import { AnalyticsTables } from "@/features/dashboard/results/analytics/@table"

export default function TableLoading() {
    return <AnalyticsTables byExam={mockByExam} bySubject={mockBySubject} loading={true} />
}

const mockByExam = Array(7).fill(0).map((_, i) => ({
    exam: `Midterm 202 ${i + 1}`,
    count: Math.floor(Math.random() * 100),
    avgMarks: Math.floor(Math.random() * 100),
    passRate: Math.floor(Math.random() * 100),
}))

const mockBySubject = Array(10).fill(0).map((_, i) => ({
    subject: `Subject ${i + 1}`,
    count: Math.floor(Math.random() * 100),
    avgMarks: Math.floor(Math.random() * 100),
    maxMarks: Math.floor(Math.random() * 100),
    minMarks: Math.floor(Math.random() * 100),
    passRate: Math.floor(Math.random() * 100),
}))