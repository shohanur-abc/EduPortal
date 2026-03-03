import { RankingTable } from "@/components/molecules/ranking-table"

export function FeeDefaultersTable({ data, loading }: { data: DefaulterRow[]; loading?: boolean }) {
    return (
        <RankingTable<DefaulterRow>
            title="Top Defaulters"
            columns={[
                { key: "studentName", header: "Student" },
                { key: "rollNumber", header: "Roll No." },
                { key: "totalDue", header: "Due Amount", render: (r) => <span className="font-semibold text-red-600">৳{r.totalDue.toLocaleString()}</span> },
                { key: "count", header: "Pending Fees" },
            ]}
            data={data}
            showRank
            loading={loading}
        />
    )
}

interface DefaulterRow {
    studentName: string
    rollNumber: string
    totalDue: number
    count: number
}
