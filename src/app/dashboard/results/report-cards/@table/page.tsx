import { ReportCardsTable } from "@/features/dashboard/results/report-cards/@table"
import * as resultsSvc from "@/services/results"

export default async function ReportCardTablePage() {
    const results = await resultsSvc.getAll()

    const uniqueStudents = [...new Set(results.map((r) => r.rollNumber))].length

    // Group results by student for the table
    const studentMap = new Map<string, { studentName: string; rollNumber: string; className: string; subjects: number; totalMarks: number; obtainedMarks: number; grades: string[] }>()
    for (const r of results) {
        const existing = studentMap.get(r.rollNumber)
        if (existing) {
            existing.subjects += 1
            existing.totalMarks += r.totalMarks
            existing.obtainedMarks += r.marks
            existing.grades.push(r.grade)
        } else {
            studentMap.set(r.rollNumber, {
                studentName: r.studentName,
                rollNumber: r.rollNumber,
                className: r.className,
                subjects: 1,
                totalMarks: r.totalMarks,
                obtainedMarks: r.marks,
                grades: [r.grade],
            })
        }
    }

    const summaries = [...studentMap.values()].map((s) => ({
        ...s,
        percentage: s.totalMarks > 0 ? Math.round((s.obtainedMarks / s.totalMarks) * 100) : 0,
        hasFail: s.grades.some((g) => ["D", "F"].includes(g)),
    }))

    return <ReportCardsTable summaries={summaries} uniqueStudents={uniqueStudents} />
}
