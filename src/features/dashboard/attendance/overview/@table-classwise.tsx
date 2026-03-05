import { RankingTable } from "@/components/molecules/ranking-table"

export function AttendanceClassWiseTable({ data, loading }: { data: ClassWiseRow[]; loading?: boolean }) {
    return (
        <RankingTable<ClassWiseRow>
            title="Class-wise Attendance"
            columns={[
                { key: "className", header: "Class" },
                { key: "total", header: "Total" },
                { key: "present", header: "Present" },
                { key: "absent", header: "Absent" },
                { key: "rate", header: "Rate", render: (r) => <span className={r.rate >= 85 ? "text-green-600" : r.rate >= 70 ? "text-yellow-600" : "text-red-600"}>{r.rate}%</span> },
            ]}
            data={data}
            showRank={false}
            loading={loading}
        />
    )
}

interface ClassWiseRow {
    className: string
    total: number
    present: number
    absent: number
    late: number
    excused: number
    rate: number
}
