import { SimpleTable } from "@/components/molecules/simple-table"
import { StatusBadge } from "@/components/molecules/status-badge"
import { AvatarCell } from "@/components/molecules/avatar-cell"


export const AttendanceRecordsTable = ({ recentRecords, loading }: { recentRecords: AttendanceRecord[], loading?: boolean }) => (
    <SimpleTable<AttendanceRecord>
        title="Recent Records"
        description="Latest attendance entries"
        columns={[
            { key: "studentName", header: "Student", render: (r) => <AvatarCell name={r.studentName} secondary={r.rollNumber} /> },
            { key: "className", header: "Class" },
            { key: "date", header: "Date" },
            { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status as "present" | "absent" | "late" | "excused"} /> },
        ]}
        data={recentRecords}
        keyExtractor={(r) => r._id}
        loading={loading}
    />
)



// ============= TYPES =============
interface AttendanceRecord {
    [key: string]: unknown
    _id: string
    studentName: string
    rollNumber: string
    className: string
    date: string
    status: string
    remarks: string
}
