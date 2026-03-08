"use client"
import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { AdvancedDataTable, SortableHeader } from "@/components/molecules/advanced-data-table"
import { DropdownActions } from "@/components/molecules/dropdown-actions"
import { MutationFormSheet } from "@/components/molecules/mutation-form-sheet"
import { ConfirmDialog } from "@/components/molecules/confirm-dialog"
import { StatusBadge } from "@/components/molecules/status-badge"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { Select } from "@/components/molecules/select"
import { FormInput } from "@/components/molecules/input"
import { attendanceCorrectionSchema, type AttendanceCorrectionData } from "@/features/dashboard/validators"
import { patchAttendance, deleteAttendance } from "@/services/attendence"
import { Edit, Trash2, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { EmptyState } from "@/components/molecules/empty-state"


export function AttendanceCorrections({ records, loading }: { records: AttendanceRecord[]; loading?: boolean }) {
    if (records.length === 0) {
        return (
            <EmptyState
                title="No Attendance Records"
                description="There are no attendance records to review for corrections. Records will appear here once attendance has been marked."
                icon={AlertCircle}
            />
        )
    }

    return <AttendanceCorrectionsCrud records={records} loading={loading} />
}

function AttendanceCorrectionsCrud({ records, loading }: { records: AttendanceRecord[]; loading?: boolean }) {
    const router = useRouter()
    const [correctionOpen, setCorrectionOpen] = React.useState(false)
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [defaults, setDefaults] = React.useState<AttendanceCorrectionData>({ status: "present", remarks: "" })
    const [deleteId, setDeleteId] = React.useState<string | null>(null)

    const handleCorrect = (row: AttendanceRecord) => {
        setEditingId(row._id)
        setDefaults({
            status: row.status as AttendanceCorrectionData["status"],
            remarks: row.remarks,
        })
        setCorrectionOpen(true)
    }

    const handleDelete = async () => {
        if (!deleteId) return
        const result = await deleteAttendance(deleteId)
        if (result.success) { toast.success(result.message); router.refresh() }
        else toast.error(result.error)
        setDeleteId(null)
    }

    const columns: ColumnDef<AttendanceRecord>[] = React.useMemo(() => [
        {
            accessorKey: "studentName",
            header: ({ column }) => <SortableHeader column={column} title="Student" />,
            cell: ({ row }) => <AvatarCell name={row.original.studentName} secondary={row.original.rollNumber} />,
        },
        { accessorKey: "className", header: "Class" },
        {
            accessorKey: "date",
            header: ({ column }) => <SortableHeader column={column} title="Date" />,
            cell: ({ row }) => (
                <span className="text-sm tabular-nums">
                    {new Date(row.original.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: ({ column }) => <SortableHeader column={column} title="Status" />,
            cell: ({ row }) => <StatusBadge status={row.original.status as "present" | "absent" | "late" | "excused"} />,
        },
        {
            accessorKey: "remarks",
            header: "Remarks",
            cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.remarks || "—"}</span>,
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <DropdownActions items={[
                    { label: "Correct Status", icon: Edit, onClick: () => handleCorrect(row.original) },
                    { separator: true },
                    { label: "Delete", icon: Trash2, destructive: true, onClick: () => setDeleteId(row.original._id) },
                ]} />
            ),
        },
    ], [])

    return (
        <>
            <AdvancedDataTable
                title="Attendance Records"
                description="Review and correct attendance entries"
                columns={columns}
                data={records}
                searchKey="studentName"
                searchPlaceholder="Search by student name..."
                loading={loading}
            />

            <MutationFormSheet<AttendanceCorrectionData>
                open={correctionOpen}
                onOpenChange={setCorrectionOpen}
                title="Correct Attendance"
                description="Change the attendance status for this record"
                schema={attendanceCorrectionSchema}
                defaultValues={defaults}
                submitLabel="Save Correction"
                onSubmit={async (data) => {
                    if (!editingId) return { success: false as const, error: "No record selected" }
                    return patchAttendance(editingId, data)
                }}
            >
                {() => (
                    <>
                        <Select
                            name="status"
                            label="Attendance Status"
                            options={[
                                { value: "present", label: "Present" },
                                { value: "absent", label: "Absent" },
                                { value: "late", label: "Late" },
                                { value: "excused", label: "Excused" },
                            ]}
                        />
                        <FormInput name="remarks" label="Remarks (optional)" placeholder="Reason for correction..." />
                    </>
                )}
            </MutationFormSheet>

            {deleteId && (
                <ConfirmDialog
                    trigger={<span ref={(el) => { if (el) el.click() }} className="hidden" />}
                    title="Delete Attendance Record"
                    description="Are you sure? This will permanently remove this attendance entry."
                    confirmLabel="Delete"
                    variant="destructive"
                    onConfirm={() => { handleDelete(); setDeleteId(null) }}
                />
            )}
        </>
    )
}

// ============= TYPES =============
interface AttendanceRecord {
    _id: string
    studentName: string
    rollNumber: string
    className: string
    date: string
    status: string
    remarks: string
}

