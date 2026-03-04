import { RecentResultsTable } from "@/features/dashboard/results/overview/@table"

export default function TableLoading() {
    return <RecentResultsTable recentResults={mockResult} loading={true} />
}

const mockResult = new Array(10).fill(0).map((_, i) => ({
    _id: `result-${i}`,
    studentName: `Jubayer Ahmed`,
    rollNumber: `2025-10A-001`,
    className: `Class 6 A`,
    exam: `Practice Test`,
    subject: `Science`,
    marks: 100,
    totalMarks: 100,
    grade: ["A+", "A", "B", "C"][i % 4],
}))