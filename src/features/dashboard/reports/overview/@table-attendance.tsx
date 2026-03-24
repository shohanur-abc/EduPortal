import { SimpleTable } from "@/components/molecules/simple-table"
import { StatusBadge } from "@/components/molecules/status-badge"
import { Badge } from "@/components/molecules"

interface AttendanceReportRow {
    [key: string]: unknown
    date: string
    status: string
    count: number
}

export function AttendanceReportTable({ data, loading }: { data: AttendanceReportRow[]; loading?: boolean }) {
    return (
        <SimpleTable<AttendanceReportRow>
            title="Attendance Data"
            description="Attendance status breakdown by date"
            columns={[
                { key: "date", header: "Date" },
                {
                    key: "status",
                    header: "Status",
                    render: (r) => <StatusBadge status={r.status as "present" | "absent" | "late" | "excused"} />,
                },
                {
                    key: "count",
                    header: "Count",
                    render: (r) => <Badge variant="outline">{r.count}</Badge>,
                },
            ]}
            data={data}
            keyExtractor={(r) => `${r.date}-${r.status}`}
            loading={loading}
            className="max-h-100 overflow-auto"
        />
    )
}
