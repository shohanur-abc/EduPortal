"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTable, SortableHeader } from "@/components/molecules/table"
import { DropdownActions } from "@/components/molecules/dropdown-actions"
import { ConfirmDialog } from "@/components/molecules/confirm-dialog"
import { MutationFormSheet } from "@/components/molecules/mutation-form-sheet"
import { StatusBadge } from "@/components/molecules/status-badge"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { FormInput } from "@/components/molecules/input"
import { Select } from "@/components/molecules"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { teacherSchema, type TeacherFormData } from "@/schemas/dashboard"
import { createTeacher, updateTeacher, deleteTeacher } from "@/services/teachers"
import { Plus, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// ============= TYPES =============
interface TeacherRow {
    _id: string
    name: string
    email: string
    phone: string
    subject: string
    department: string
    qualification: string
    status: string
    joinDate: string
}

// ============= DEFAULTS =============
const emptyTeacher: TeacherFormData = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    department: "",
    qualification: "",
    status: "active",
}

// ============= MAIN COMPONENT =============
export function StaffTable({ teachers, loading }: { teachers: TeacherRow[], loading?: boolean }) {
    const router = useRouter()
    const [formOpen, setFormOpen] = React.useState(false)
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [defaults, setDefaults] = React.useState<TeacherFormData>(emptyTeacher)
    const [deleteId, setDeleteId] = React.useState<string | null>(null)

    const handleEdit = (row: TeacherRow) => {
        setEditingId(row._id)
        setDefaults({
            name: row.name,
            email: row.email,
            phone: row.phone,
            subject: row.subject,
            department: row.department,
            qualification: row.qualification,
            status: row.status as TeacherFormData["status"],
        })
        setFormOpen(true)
    }

    const handleCreate = () => {
        setEditingId(null)
        setDefaults(emptyTeacher)
        setFormOpen(true)
    }

    const handleDelete = async () => {
        if (!deleteId) return
        const result = await deleteTeacher(deleteId)
        if (result.success) { toast.success(result.message); router.refresh() }
        else toast.error(result.error)
        setDeleteId(null)
    }

    const columns: ColumnDef<TeacherRow>[] = React.useMemo(() => [
        {
            accessorKey: "name",
            header: ({ column }) => <SortableHeader column={column} title="Name" />,
            cell: ({ row }) => <AvatarCell name={row.original.name} secondary={row.original.email} />,
        },
        {
            accessorKey: "subject",
            header: ({ column }) => <SortableHeader column={column} title="Subject" />,
        },
        {
            accessorKey: "department",
            header: ({ column }) => <SortableHeader column={column} title="Department" />,
            cell: ({ row }) => <Badge variant="outline">{row.original.department}</Badge>,
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.phone || "—"}</span>,
        },
        {
            accessorKey: "qualification",
            header: "Qualification",
            cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.qualification || "—"}</span>,
        },
        {
            accessorKey: "joinDate",
            header: ({ column }) => <SortableHeader column={column} title="Join Date" />,
            cell: ({ row }) => (
                <span className="text-sm tabular-nums">
                    {row.original.joinDate ? new Date(row.original.joinDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: ({ column }) => <SortableHeader column={column} title="Status" />,
            cell: ({ row }) => <StatusBadge status={row.original.status as "active" | "on-leave" | "inactive"} />,
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <DropdownActions
                    items={[
                        { label: "Edit", icon: Edit, onClick: () => handleEdit(row.original) },
                        { separator: true },
                        { label: "Delete", icon: Trash2, destructive: true, onClick: () => setDeleteId(row.original._id) },
                    ]}
                />
            ),
        },
    ], [])

    return (
        <>
            <DataTable
                title="Teaching Staff"
                description="Manage teacher records"
                columns={columns}
                data={teachers}
                searchKey="name"
                searchPlaceholder="Search teachers..."
                toolbar={
                    <Button size="sm" onClick={handleCreate}>
                        <Plus className="mr-2 size-4" /> Add Teacher
                    </Button>
                }
                loading={loading}
            />

            <MutationFormSheet<TeacherFormData>
                open={formOpen}
                onOpenChange={setFormOpen}
                title={editingId ? "Edit Teacher" : "Add Teacher"}
                description={editingId ? "Update teacher information" : "Enter new teacher details"}
                schema={teacherSchema}
                defaultValues={defaults}
                submitLabel={editingId ? "Update" : "Create"}
                onSubmit={async (data) => {
                    if (editingId) return updateTeacher(editingId, data)
                    return createTeacher(data)
                }}
            >
                {() => (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="name" label="Full Name" placeholder="Teacher name" />
                            <FormInput name="email" label="Email" type="email" placeholder="teacher@email.com" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="phone" label="Phone" placeholder="+880..." />
                            <FormInput name="subject" label="Subject" placeholder="e.g. Mathematics" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="department" label="Department" placeholder="e.g. Science" />
                            <FormInput name="qualification" label="Qualification" placeholder="e.g. M.Sc. in Physics" />
                        </div>
                        <Select
                            name="status"
                            label="Status"
                            options={[
                                { value: "active", label: "Active" },
                                { value: "on-leave", label: "On Leave" },
                                { value: "inactive", label: "Inactive" },
                            ]}
                        />
                    </>
                )}
            </MutationFormSheet>

            {deleteId && (
                <ConfirmDialog
                    trigger={<span ref={(el) => { if (el) el.click() }} className="hidden" />}
                    title="Delete Teacher"
                    description="Are you sure? This will permanently remove this teacher record."
                    confirmLabel="Delete"
                    variant="destructive"
                    onConfirm={() => { handleDelete(); setDeleteId(null) }}
                />
            )}
        </>
    )
}
