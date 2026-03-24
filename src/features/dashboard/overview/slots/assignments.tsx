import { Result } from "@/services"
import { Badge } from "@/components/ui/badge"
import { SimpleTable } from "@/components/molecules/simple-table"
import { AvatarCell } from "@/components/molecules/avatar-cell"

export async function OverviewAssignmentsSlot() {
    const recentResults = await Result.getRecent(8)

    const assignmentRows = recentResults.map((item) => {
        const scorePercent = item.totalMarks > 0 ? Math.round((item.marks / item.totalMarks) * 100) : 0
        return {
            ...item,
            scorePercent,
            status: scorePercent >= 80 ? "completed" : scorePercent >= 50 ? "in progress" : "needs review",
        }
    })

    return (
        <SimpleTable
            title="Assignments"
            description="Recent result records"
            columns={[
                { key: "studentName", header: "Student", render: (row) => <AvatarCell name={String(row.studentName)} secondary={String(row.className)} /> },
                { key: "subject", header: "Subject" },
                { key: "exam", header: "Exam" },
                { key: "scorePercent", header: "Score", render: (row) => `${Number(row.scorePercent)}%` },
                {
                    key: "status",
                    header: "Status",
                    render: (row) => (
                        <Badge variant="outline" className="capitalize">{String(row.status)}</Badge>
                    ),
                },
            ]}
            data={assignmentRows}
            keyExtractor={(row) => String(row._id)}
        />
    )
}
