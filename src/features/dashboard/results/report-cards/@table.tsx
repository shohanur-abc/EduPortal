import { SimpleTable } from "@/components/molecules/simple-table"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { EmptyState } from "@/components/molecules/empty-state"
import { Badge } from "@/components/ui/badge"
import { Award } from "@/lib/icon"



export function ReportCardsTable({ summaries, uniqueStudents, loading }: { summaries: StudentSummary[]; uniqueStudents: number; loading?: boolean }) {
    if (summaries.length === 0) {
        return (
            <EmptyState
                title="No Report Card Data"
                description="There are no results available to generate report cards. Enter exam results first."
                icon={Award}
            />
        )
    }

    return (
        <SimpleTable<StudentSummary>
            title="Student Report Cards"
            description={`Summary for ${uniqueStudents} students`}
            columns={[
                {
                    key: "studentName",
                    header: "Student",
                    render: (r) => <AvatarCell name={String(r.studentName)} secondary={String(r.rollNumber)} />,
                },
                { key: "className", header: "Class" },
                {
                    key: "subjects",
                    header: "Subjects",
                    render: (r) => (
                        <Badge variant="secondary">{String(r.subjects)} subjects</Badge>
                    ),
                },
                {
                    key: "obtainedMarks",
                    header: "Marks",
                    render: (r) => (
                        <span className="tabular-nums">
                            {String(r.obtainedMarks)}<span className="text-muted-foreground">/{String(r.totalMarks)}</span>
                        </span>
                    ),
                },
                {
                    key: "percentage",
                    header: "%",
                    render: (r) => {
                        const pct = Number(r.percentage)
                        return (
                            <span className={pct >= 80 ? "font-medium text-green-700 dark:text-green-400" : pct >= 50 ? "text-foreground" : "font-medium text-red-700 dark:text-red-400"}>
                                {pct}%
                            </span>
                        )
                    },
                },
                {
                    key: "status",
                    header: "Status",
                    render: (r) => (
                        <Badge variant={r.hasFail ? "destructive" : "default"}>
                            {r.hasFail ? "Needs Improvement" : "Passed"}
                        </Badge>
                    ),
                },
            ]}
            data={summaries}
            keyExtractor={(r) => String(r.rollNumber)}
            loading={loading}
        />
    )
}
