import { ProgressList } from "@/components/molecules/progress-list"

export function ResultSubjectProgress({ data, loading }: { data: SubjectPerfRow[]; loading?: boolean }) {
    return (
        <ProgressList
            title="Subject Pass Rates"
            items={data.map((d) => ({
                label: d.subject,
                value: d.passRate,
                max: 100,
                variant: d.passRate >= 80 ? "success" : d.passRate >= 60 ? "warning" : "danger",
            }))}
            loading={loading}
        />
    )
}

interface SubjectPerfRow {
    subject: string
    avgMarks: number
    maxMarks: number
    minMarks: number
    passRate: number
    failCount: number
    total: number
}
