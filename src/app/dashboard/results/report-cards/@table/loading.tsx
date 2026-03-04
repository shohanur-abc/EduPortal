import { ReportCardsTable } from "@/features/dashboard/results/report-cards/@table"

export default function TableLoading() {
    return <ReportCardsTable summaries={mockSummaries} uniqueStudents={10} loading={true} />
}


const mockSummaries = Array(10).fill(0).map((_, i) => ({
    studentName: `Jubayer Ahmed`,
    rollNumber: `2025-10A-00${i + 1}`,
    className: `Class 6 A`,
    subjects: 5,
    totalMarks: 500,
    obtainedMarks: Math.floor(Math.random() * 500),
    percentage: Math.floor(Math.random() * 100),
    hasFail: Math.random() > 0.8,
}))