"use client"

import * as React from "react"
import { toast } from "sonner"
import { ColumnDef } from "@tanstack/react-table"
import { EmptyState } from "@/components/molecules/empty-state"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { Button, DataTable, Input, SortableHeader } from "@/components/molecules"
import { AlertCircle, BriefcaseBusiness, statusIcon } from "@/lib/icon"
import { attendanceBgColors, attendanceHoverColors, attendanceSelectedColors } from "@/lib/color"
import { cn } from "@/lib"
import { markBulkStaffAttendance } from "@/services/attendence"
import { useRouter } from "next/navigation"

export function StaffAttendance({ members }: { members: StaffMember[] }) {
    const router = useRouter()
    const [statusFilter, setStatusFilter] = React.useState<StatusType | "all">("all")
    const [selectedDate, setSelectedDate] = React.useState<string>(new Date().toISOString().split("T")[0])
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [records, setRecords] = React.useState<StaffAttendanceRecord[]>([])

    React.useEffect(() => {
        setRecords(
            members.map((member) => ({
                memberId: member._id,
                memberType: member.type,
                name: member.name,
                secondary: member.secondary,
                designation: member.designation,
                status: "present",
                remarks: "",
            }))
        )
    }, [members])

    const handleStatusChange = React.useCallback((memberId: string, status: StatusType) => {
        setRecords((prev) => prev.map((item) => (item.memberId === memberId ? { ...item, status } : item)))
    }, [])

    const handleSubmitAttendance = React.useCallback(async () => {
        if (!selectedDate) {
            toast.error("Please select date")
            return
        }

        setIsSubmitting(true)
        try {
            const result = await markBulkStaffAttendance({
                date: selectedDate,
                entries: records.map((record) => ({
                    memberId: record.memberId,
                    memberType: record.memberType,
                    status: record.status,
                    remarks: record.remarks,
                })),
            })

            if (result.success) {
                toast.success(result.message)
                router.refresh()
            } else {
                toast.error(result.error)
            }
        } catch {
            toast.error("Failed to submit staff attendance")
        } finally {
            setIsSubmitting(false)
        }
    }, [records, router, selectedDate])

    const filteredRecords = React.useMemo(() => {
        if (statusFilter === "all") return records
        return records.filter((record) => record.status === statusFilter)
    }, [records, statusFilter])

    const columns: ColumnDef<StaffAttendanceRecord>[] = React.useMemo(
        () => [
            {
                id: "sn",
                header: () => <span className="text-center font-mono font-semibold text-sm text-muted-foreground w-full ml-2">#</span>,
                cell: ({ row }) => (
                    <span className="text-center font-mono font-semibold text-sm text-muted-foreground flex items-center justify-center w-full ml-1">
                        {String(row.index + 1).padStart(2, "0")}
                    </span>
                ),
                size: 10,
            },
            {
                accessorKey: "name",
                header: ({ column }) => <SortableHeader column={column} title="Staff Member" />,
                cell: ({ row }) => (
                    <AvatarCell
                        name={row.original.name}
                        secondary={row.original.secondary}
                        status={row.original.status}
                        remarks={row.original.remarks}
                    />
                ),
            },
            {
                accessorKey: "designation",
                header: ({ column }) => <SortableHeader column={column} title="Designation" />,
                cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.designation}</span>,
            },
            {
                id: "status",
                header: () => <div className="text-center">Status</div>,
                size: 100,
                cell: ({ row }) => (
                    <div className="flex gap-1 justify-end">
                        {(["present", "absent", "late", "excused"] as const).map((status) => (
                            <Button
                                key={status}
                                size="icon-sm"
                                variant={row.original.status === status ? "outline" : "ghost"}
                                className={cn(
                                    attendanceBgColors[status],
                                    attendanceHoverColors[status],
                                    row.original.status === status && attendanceSelectedColors[status]
                                )}
                                onClick={() => handleStatusChange(row.original.memberId, status)}
                                title={status}
                            >
                                {statusIcon(status)}
                            </Button>
                        ))}
                    </div>
                ),
            },
        ],
        [handleStatusChange]
    )

    if (members.length === 0) {
        return (
            <EmptyState
                title="No Staff Available"
                description="No teachers or staff members were found for attendance marking."
                icon={BriefcaseBusiness}
            />
        )
    }

    return (
        <div className="space-y-6 max-w-200 mx-auto">
            <DataTable
                title="Staff Attendance"
                toolbar={
                    <>
                        <Input type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} className="w-auto" />
                        <Button variant={statusFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setStatusFilter("all")}>All ({records.length})</Button>
                        {(["present", "absent", "late", "excused"] as const).map((status) => {
                            const count = records.filter((item) => item.status === status).length
                            return (
                                <Button
                                    key={status}
                                    variant={statusFilter === status ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setStatusFilter(status)}
                                    className={cn(attendanceBgColors[status], statusFilter === status && attendanceSelectedColors[status], attendanceHoverColors[status])}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                                </Button>
                            )
                        })}
                    </>
                }
                columns={columns}
                data={filteredRecords}
                searchKey="name"
                searchPlaceholder="Search by staff name..."
                pageSize={10}
                enableColumnVisibility={false}
                footer={
                    records.length > 0 ? (
                        <Button onClick={handleSubmitAttendance} disabled={isSubmitting} loading={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Attendance"}
                        </Button>
                    ) : null
                }
            />

            {records.length === 0 && (
                <EmptyState
                    title="No Records Found"
                    description="No staff records found to mark attendance."
                    icon={AlertCircle}
                />
            )}
        </div>
    )
}

type StatusType = "present" | "absent" | "late" | "excused"

interface StaffMember {
    _id: string
    name: string
    secondary: string
    type: "teacher" | "staff"
    designation: string
}

interface StaffAttendanceRecord {
    memberId: string
    memberType: "teacher" | "staff"
    name: string
    secondary: string
    designation: string
    status: StatusType
    remarks?: string
}
