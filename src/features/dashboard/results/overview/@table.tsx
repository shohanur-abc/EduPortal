import { DataTable } from "@/components/molecules/data-table"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { Badge } from "@/components/ui/badge"

export function RecentResultsTable({ recentResults, loading }: { recentResults: ResultRecord[], loading?: boolean }) {
    return (
        <DataTable<ResultRecord>
            title="Recent Results"
            description="Latest exam results"
            columns={[
                { key: "studentName", header: "Student", render: (r) => <AvatarCell name={r.studentName} secondary={r.rollNumber} /> },
                { key: "className", header: "Class" },
                { key: "exam", header: "Exam" },
                { key: "subject", header: "Subject" },
                { key: "marks", header: "Marks", render: (r) => <span>{r.marks}/{r.totalMarks}</span> },
                {
                    key: "grade", header: "Grade", render: (r) => (
                        <Badge variant={gradeBadgeVariant(r.grade)}>
                            {r.grade}
                        </Badge>
                    ),
                },
            ]}
            data={recentResults}
            keyExtractor={(r) => r._id}
            loading={loading}
        />
    )
}



function gradeBadgeVariant(grade: string) {
    if (["A+", "A", "A-"].includes(grade)) return "default" as const
    if (["B+", "B", "B-"].includes(grade)) return "secondary" as const
    if (["C+", "C"].includes(grade)) return "outline" as const
    return "destructive" as const
}
