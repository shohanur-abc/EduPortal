import { RankingTable } from "@/components/molecules/ranking-table"

export function ResultClassPerformanceTable({ data, loading }: { data: ClassPerfRow[]; loading?: boolean }) {
    return (
        <RankingTable<ClassPerfRow>
            title="Class Performance"
            columns={[
                { key: "className", header: "Class" },
                { key: "avgMarks", header: "Avg", render: (r) => <span className={r.avgMarks >= 60 ? "text-green-600" : "text-red-600"}>{r.avgMarks}%</span> },
                { key: "maxMarks", header: "Max" },
                { key: "minMarks", header: "Min" },
                { key: "passRate", header: "Pass Rate", render: (r) => `${r.passRate}%` },
                { key: "studentCount", header: "Students" },
            ]}
            data={data}
            showRank={false}
            loading={loading}
        />
    )
}

interface ClassPerfRow {
    [key: string]: unknown
    className: string
    avgMarks: number
    maxMarks: number
    minMarks: number
    studentCount: number
    passRate: number
}
