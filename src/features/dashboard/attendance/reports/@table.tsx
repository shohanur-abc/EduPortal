import { DataTable } from "@/components/molecules/data-table"
import { StatusBadge } from "@/components/molecules/status-badge"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { EmptyState } from "@/components/molecules/empty-state"
import { FileBarChart } from "lucide-react"


export function AttendanceReportTable({ records, loading }: { records: AttendanceRecord[], loading?: boolean }) {
    if (records.length === 0) {
        return (
            <EmptyState
                title="No Report Data"
                description="There are no attendance records available to generate reports. Reports will appear here once attendance data is present."
                icon={FileBarChart}
            />
        )
    }

    return (
        <DataTable<AttendanceRecord>
            title="Attendance Report"
            description={`Showing ${records.length} attendance records across all classes`}
            columns={[
                {
                    key: "studentName",
                    header: "Student",
                    render: (r) => <AvatarCell name={r.studentName} secondary={r.rollNumber} />,
                },
                {
                    key: "className",
                    header: "Class",
                },
                {
                    key: "date",
                    header: "Date",
                },
                {
                    key: "status",
                    header: "Status",
                    render: (r) => <StatusBadge status={r.status as "present" | "absent" | "late" | "excused"} />,
                },
                {
                    key: "remarks",
                    header: "Remarks",
                    render: (r) => <span className="text-sm text-muted-foreground">{r.remarks || "—"}</span>,
                },
            ]}
            data={records}
            keyExtractor={(r) => r._id}
            loading={loading}
        />
    )
}
