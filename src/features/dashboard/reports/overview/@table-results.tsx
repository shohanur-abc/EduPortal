import { SimpleTable } from "@/components/molecules/simple-table"
import { Badge } from "@/components/ui/badge"

interface ResultReportRow {
    [key: string]: unknown
    exam: string
    subject: string
    avgMarks: number
    count: number
}

export function ResultReportTable({ data, loading }: { data: ResultReportRow[]; loading?: boolean }) {
    return (
        <SimpleTable<ResultReportRow>
            title="Result Data"
            description="Exam performance by subject"
            columns={[
                { key: "exam", header: "Exam" },
                {
                    key: "subject",
                    header: "Subject",
                    render: (r) => <span className="font-medium">{r.subject}</span>,
                },
                {
                    key: "avgMarks",
                    header: "Avg. Marks",
                    render: (r) => (
                        <Badge variant={r.avgMarks >= 70 ? "default" : r.avgMarks >= 50 ? "secondary" : "destructive"}>
                            {r.avgMarks}%
                        </Badge>
                    ),
                },
                {
                    key: "count",
                    header: "Students",
                    render: (r) => <Badge variant="outline">{r.count}</Badge>,
                },
            ]}
            data={data}
            keyExtractor={(r) => `${r.exam}-${r.subject}`}
            loading={loading}
            className="max-h-100 overflow-auto"
        />
    )
}
