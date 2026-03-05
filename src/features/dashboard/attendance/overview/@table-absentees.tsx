import { RankingTable } from "@/components/molecules/ranking-table"

export function AttendanceTopAbsenteesTable({ data, loading }: { data: AbsenteeRow[]; loading?: boolean }) {
    return (
        <RankingTable<AbsenteeRow>
            title="Top Absentees"
            columns={[
                { key: "studentName", header: "Student" },
                { key: "rollNumber", header: "Roll No." },
                { key: "className", header: "Class" },
                { key: "absences", header: "Absences", render: (r) => <span className="font-semibold text-red-600">{r.absences}</span> },
            ]}
            data={data}
            showRank
            loading={loading}
        />
    )
}

interface AbsenteeRow {
    studentName: string
    rollNumber: string
    className: string
    absences: number
}
