"use client"
import { EmptyState } from "@/components/molecules/empty-state"
import * as React from "react"
import { Button, Select, DataTable, SortableHeader, Textarea, Input } from "@/components/molecules"
import { AlertCircle, Users, statusIcon, Edit } from "@/lib/icon"
import { MutationFormSheet } from "@/components/molecules/mutation-form-sheet"
import { ConfirmDialog } from "@/components/molecules/confirm-dialog"
import { AttendanceCorrectionData, attendanceCorrectionSchema } from "@/schemas/dashboard/attendance"
import { ColumnDef } from "@tanstack/react-table"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { attendanceBgColors, attendanceBorderColors, attendanceHoverColors, attendanceSelectedColors } from "@/lib/color"
import { cn } from "@/lib"
import { patchAttendance } from "@/services/attendence"
import { useAttendanceMark } from "./use-attendance-mark"
import { Separator } from "@/components/ui/separator"


export function StudentAttendance({ classes }: { classes: ClassInfo[] }) {
    if (classes?.length === 0) {
        return (
            <EmptyState
                title="No Classes Available"
                description="There are no classes assigned yet. Contact the administrator to assign classes before marking attendance."
                icon={Users}
            />
        )
    }

    return <AttendanceMarkForm classes={classes} />
}


// ============= BULK MARK ATTENDANCE =============
export function AttendanceMarkForm({ classes }: { classes: ClassInfo[] }) {
    // const { selectedClassId, selectedClassSection, selectedDate } = useMarkContext()
    const [selectedClassId, setSelectedClassId] = React.useState<string | null>(classes[0]?._id || null)
    const [selectedDate, setSelectedDate] = React.useState<string>(new Date().toISOString().split("T")[0]) // Default to today

    const [statusFilter, setStatusFilter] = React.useState<StatusType | "all">("all")
    const {
        editingId,
        defaults,
        deleteId,
        records,
        correctionOpen,
        handleCorrect,
        handleCloseCorrectionForm,
        handleSetDeleteId,
        handleStatusChange,
        handleSubmitAttendance,
        isSubmitting,
        isPending,
        fetchRecords
    } = useAttendanceMark(selectedClassId, selectedDate)


    const handleClassChange = (classId: string) => {
        const selectedClass = classes.find((cls) => cls._id === classId)
        if (selectedClass) {
            setSelectedClassId(classId)
            fetchRecords(classId, selectedClass.section)
        }
    }

    React.useEffect(() => {
        handleClassChange(selectedClassId || "")
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    // Filter records by status
    const filteredRecords = React.useMemo(() => {
        if (statusFilter === "all") return records
        return records.filter((r) => r.status === statusFilter)
    }, [records, statusFilter])

    const columns: ColumnDef<AttendanceRecord>[] = React.useMemo(() => [
        {
            id: "sn",
            cell: ({ row }) => (
                <span className="text-center font-mono font-semibold text-sm text-muted-foreground flex items-center justify-center w-full ml-1" >
                    {/* {(row.index + 1).toString().padStart(2, "0")} */}
                    {+row.original.rollNumber.split("-").slice(-1)[0]}
                </span>
            ),
            header: () => <span className="text-center font-mono font-semibold text-sm text-muted-foreground w-full ml-2">#</span>,
            size: 10,
        },
        {
            accessorKey: "name",
            header: ({ column }) => <SortableHeader column={column} title="Student" />,
            cell: ({ row }) => <AvatarCell name={row.original.name} secondary={row.original.rollNumber} status={row.original.status as StatusType} remarks={row.original.remarks} />,
            meta: { title: "Student" },
        },
        {
            id: "status",
            header: () => <div className="text-center">Status</div>,
            size: 100,
            cell: ({ row }) => (
                <div className="flex gap-1 justify-end">
                    {(["present", "absent", "late", "excused"] as const).map((s) => (
                        <Button
                            key={s}
                            size="icon-sm"
                            variant={row.original.status === s ? "outline" : "ghost"}
                            className={cn(attendanceBgColors[s], attendanceBorderColors[s], attendanceHoverColors[s], row.original.status === s && attendanceSelectedColors[s])}
                            onClick={() => handleStatusChange(row.original._id, s)}
                            title={s}
                        >
                            {statusIcon(s)}
                        </Button>
                    ))}
                    <Button variant="ghost" size="icon" onClick={() => handleCorrect(row.original)}><Edit /></Button>
                </div>
            ),
        },
    ], [handleCorrect, handleStatusChange])


    return (
        <div className="space-y-6 max-w-[600px] mx-auto">
            <DataTable
                title={
                    <div className="flex gap-2 items-center">
                        Student Attendance
                        <Select
                            label="Class"
                            name="class"
                            options={classes.map((cls) => ({ value: cls._id, label: `${cls.name} - ${cls.section}` }))}
                            defaultValue={classes[0]?._id}
                            onValueChange={handleClassChange}
                            classNames={{ label: 'sr-only', field: 'w-fit ml-auto' }}
                        />
                        <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-auto" />
                    </div>
                }
                // toolbarPro={(table) => <SearchBar
                //     placeholder={"Search..."}
                //     onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
                // />}
                toolbar={<>
                    <Button
                        variant={statusFilter === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter("all")}
                    >
                        All ({records.length})
                    </Button>
                    {(["present", "absent", "late", "excused"] as const).map((status) => {
                        const count = records.filter((r) => r.status === status).length
                        return (
                            <Button
                                key={status}
                                variant={statusFilter === status ? "default" : "ghost"}
                                size="sm"
                                onPointerDown={() => setStatusFilter(status)}
                                className={`${attendanceBgColors[status]} ${statusFilter === status && attendanceSelectedColors[status]} ${attendanceHoverColors[status]}`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                            </Button>
                        )
                    })}
                </>}
                columns={columns}
                data={filteredRecords}
                searchKey="name"
                searchPlaceholder="Search by student name..."
                pageSize={10}
                enableColumnVisibility={false}
                skeletonRows={15}
                loading={isPending}
                footer={
                    records.length > 0 && (
                        <Button
                            onClick={handleSubmitAttendance}
                            disabled={isSubmitting}
                            loading={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Attendance"}
                        </Button>
                    )
                }
            />

            {selectedClassId && records.length === 0 && (
                <EmptyState
                    title="No Records Found"
                    description="No attendance records found for this class and date."
                    icon={AlertCircle}
                />
            )}

            <MutationFormSheet<AttendanceCorrectionData>
                open={correctionOpen}
                onOpenChange={handleCloseCorrectionForm}
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
                        <AvatarCell name={defaults.name || ''} secondary={defaults.rollNumber || ''} status={defaults.status as StatusType} remarks={defaults.remarks} />
                        <Separator className="mb-4" />

                        <Select
                            name="status"
                            label="Attendance Status"
                            defaultValue={defaults.status}
                            options={[
                                { value: "present", label: "Present" },
                                { value: "absent", label: "Absent" },
                                { value: "late", label: "Late" },
                                { value: "excused", label: "Excused" },
                            ]}
                        />
                        <Textarea name="remarks" className="min-h-30" placeholder="Reason for correction..." />
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
                    onConfirm={() => {
                        handleSetDeleteId(null)
                    }}
                />
            )}
        </div>
    )
}


// ============= MARK SECTION =============
interface ClassInfo {
    _id: string
    name: string
    section: string
    grade: number
}

interface AttendanceRecord {
    _id: string;
    name: string;
    rollNumber: string;
    section: string;
    status: StatusType;
    remarks?: string;
}

type StatusType = "present" | "absent" | "late" | "excused"