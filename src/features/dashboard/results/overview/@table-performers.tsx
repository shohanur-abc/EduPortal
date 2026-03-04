import { RankingTable } from "@/components/molecules/ranking-table"

export function ResultTopPerformersTable({ data, loading }: { data: PerformerRow[]; loading?: boolean }) {
    return (
        <RankingTable<PerformerRow>
            title="Top Performers"
            columns={[
                { key: "studentName", header: "Student" },
                { key: "rollNumber", header: "Roll No." },
                { key: "className", header: "Class" },
                { key: "avgMarks", header: "Avg Marks", render: (r) => <span className="font-semibold text-green-600">{r.avgMarks}%</span> },
                { key: "totalExams", header: "Exams" },
            ]}
            data={data}
            showRank
            loading={loading}
        />
    )
}

interface PerformerRow {
    studentName: string
    rollNumber: string
    className: string
    avgMarks: number
    totalExams: number
}
