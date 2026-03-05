import { DataTable } from "@/components/molecules/data-table"
import { EmptyState } from "@/components/molecules/empty-state"
import { Badge } from "@/components/ui/badge"
import { BookOpen, LineChart } from "lucide-react"

interface ExamAnalytics extends Record<string, unknown> {
    exam: string
    count: number
    avgMarks: number
    passRate: number
}

interface SubjectAnalytics extends Record<string, unknown> {
    subject: string
    count: number
    avgMarks: number
    maxMarks: number
    minMarks: number
}

export function AnalyticsTables({ byExam, bySubject, loading }: { byExam: ExamAnalytics[]; bySubject: SubjectAnalytics[]; loading?: boolean }) {
    if (byExam.length === 0 && bySubject.length === 0) {
        return (
            <EmptyState
                title="No Analytics Data"
                description="There is not enough result data to generate analytics. Analytics will be available once exam results are recorded."
                icon={LineChart}
            />
        )
    }

    return (
        <div className="space-y-6">
            <DataTable<ExamAnalytics>
                title="Exam-wise Analytics"
                description={`Performance breakdown for ${byExam.length} exams`}
                columns={[
                    {
                        key: "exam",
                        header: "Exam",
                        render: (r) => <span className="font-medium">{String(r.exam)}</span>,
                    },
                    {
                        key: "count",
                        header: "Results",
                        render: (r) => (
                            <Badge variant="secondary">{String(r.count)} records</Badge>
                        ),
                    },
                    {
                        key: "avgMarks",
                        header: "Avg Marks",
                        render: (r) => {
                            const avg = Number(r.avgMarks)
                            return (
                                <span className={avg >= 70 ? "font-medium text-green-700 dark:text-green-400" : avg >= 50 ? "text-foreground" : "font-medium text-red-700 dark:text-red-400"}>
                                    {avg}%
                                </span>
                            )
                        },
                    },
                    {
                        key: "passRate",
                        header: "Pass Rate",
                        render: (r) => {
                            const rate = Number(r.passRate)
                            return (
                                <Badge variant={rate >= 80 ? "default" : rate >= 60 ? "secondary" : "destructive"}>
                                    {rate}%
                                </Badge>
                            )
                        },
                    },
                ]}
                data={byExam}
                keyExtractor={(r) => String(r.exam)}
                loading={loading}
            />

            <DataTable<SubjectAnalytics>
                title="Subject-wise Analytics"
                description={`Performance breakdown for ${bySubject.length} subjects`}
                columns={[
                    {
                        key: "subject",
                        header: "Subject",
                        render: (r) => (
                            <span className="flex items-center gap-2 font-medium">
                                <BookOpen className="size-4 text-muted-foreground" />
                                {String(r.subject)}
                            </span>
                        ),
                    },
                    {
                        key: "count",
                        header: "Results",
                        render: (r) => (
                            <Badge variant="secondary">{String(r.count)} records</Badge>
                        ),
                    },
                    {
                        key: "avgMarks",
                        header: "Average",
                        render: (r) => {
                            const avg = Number(r.avgMarks)
                            return (
                                <span className={avg >= 70 ? "font-medium text-green-700 dark:text-green-400" : avg >= 50 ? "text-foreground" : "font-medium text-red-700 dark:text-red-400"}>
                                    {avg}%
                                </span>
                            )
                        },
                    },
                    {
                        key: "maxMarks",
                        header: "Highest",
                        render: (r) => (
                            <span className="font-medium text-green-700 dark:text-green-400">{String(r.maxMarks)}</span>
                        ),
                    },
                    {
                        key: "minMarks",
                        header: "Lowest",
                        render: (r) => (
                            <span className="font-medium text-red-700 dark:text-red-400">{String(r.minMarks)}</span>
                        ),
                    },
                ]}
                data={bySubject}
                keyExtractor={(r) => String(r.subject)}
                loading={loading}
            />
        </div>
    )
}
