"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { AdvancedDataTable, SortableHeader } from "@/components/molecules/advanced-data-table"
import { DropdownActions } from "@/components/molecules/dropdown-actions"
import { ConfirmDialog } from "@/components/molecules/confirm-dialog"
import { MutationFormSheet } from "@/components/molecules/mutation-form-sheet"
import { StatusBadge } from "@/components/molecules/status-badge"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { FormInput } from "@/components/molecules/input"
import { Select } from "@/components/molecules/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { classSchema, type ClassFormData } from "@/features/dashboard/validators"
import { createClass, updateClass, deleteClass } from "@/features/dashboard/actions/mutations"
import { Plus, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// ============= DEFAULTS =============
const emptyClass: ClassFormData = {
    name: "",
    section: "",
    grade: 1,
    academicYear: "2025-2026",
    classTeacher: "",
    maxStudents: 40,
    subjects: [],
    room: "",
    status: "active",
}

// ============= MAIN COMPONENT =============
export function ClassesCrudTable({ classes, teachers, loading }: { classes: ClassRow[]; teachers: TeacherOption[]; loading?: boolean }) {
    const router = useRouter()
    const [formOpen, setFormOpen] = React.useState(false)
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [defaults, setDefaults] = React.useState<ClassFormData>(emptyClass)
    const [deleteId, setDeleteId] = React.useState<string | null>(null)

    const handleEdit = (row: ClassRow) => {
        setEditingId(row._id)
        setDefaults({
            name: row.name,
            section: row.section,
            grade: row.grade,
            academicYear: row.academicYear,
            classTeacher: "",
            maxStudents: row.maxStudents,
            subjects: row.subjects,
            room: row.room,
            status: row.status as ClassFormData["status"],
        })
        setFormOpen(true)
    }

    const handleCreate = () => {
        setEditingId(null)
        setDefaults(emptyClass)
        setFormOpen(true)
    }

    const handleDelete = async () => {
        if (!deleteId) return
        const result = await deleteClass(deleteId)
        if (result.success) { toast.success(result.message); router.refresh() }
        else toast.error(result.error)
        setDeleteId(null)
    }

    const columns: ColumnDef<ClassRow>[] = React.useMemo(() => [
        {
            accessorKey: "name",
            header: ({ column }) => <SortableHeader column={column} title="Class" />,
            cell: ({ row }) => <span className="font-medium">{row.original.name} ({row.original.section})</span>,
        },
        {
            accessorKey: "grade",
            header: ({ column }) => <SortableHeader column={column} title="Grade" />,
            cell: ({ row }) => <Badge variant="outline">Grade {row.original.grade}</Badge>,
        },
        { accessorKey: "academicYear", header: "Year" },
        {
            accessorKey: "classTeacherName",
            header: "Teacher",
            cell: ({ row }) => <AvatarCell name={row.original.classTeacherName} />,
        },
        {
            accessorKey: "studentCount",
            header: "Students",
            cell: ({ row }) => <span>{row.original.studentCount}/{row.original.maxStudents}</span>,
        },
        { accessorKey: "room", header: "Room" },
        {
            accessorKey: "subjects",
            header: "Subjects",
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.subjects.slice(0, 3).map((s) => (
                        <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                    ))}
                    {row.original.subjects.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{row.original.subjects.length - 3}</Badge>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <StatusBadge status={row.original.status as "active" | "inactive"} />,
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
            <AdvancedDataTable
                title="All Classes"
                description="Manage classes — create, edit, or delete"
                columns={columns}
                data={classes}
                searchKey="name"
                searchPlaceholder="Search classes..."
                toolbar={
                    <Button size="sm" onClick={handleCreate}>
                        <Plus className="mr-2 size-4" /> Add Class
                    </Button>
                }
                loading={loading}
            />

            <MutationFormSheet<ClassFormData>
                open={formOpen}
                onOpenChange={setFormOpen}
                title={editingId ? "Edit Class" : "Add Class"}
                description={editingId ? "Update class details" : "Create a new class"}
                schema={classSchema}
                defaultValues={defaults}
                submitLabel={editingId ? "Update" : "Create"}
                onSubmit={async (data) => {
                    if (editingId) return updateClass(editingId, data)
                    return createClass(data)
                }}
            >
                {() => (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="name" label="Class Name" placeholder="e.g. Class 10" />
                            <FormInput name="section" label="Section" placeholder="e.g. A" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="grade" label="Grade" type="number" placeholder="1-12" />
                            <FormInput name="academicYear" label="Academic Year" placeholder="2025-2026" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                name="classTeacher"
                                label="Class Teacher"
                                placeholder="Select teacher"
                                options={teachers.map((t) => ({ value: t._id, label: t.name }))}
                            />
                            <FormInput name="maxStudents" label="Max Students" type="number" placeholder="40" />
                        </div>
                        <FormInput name="room" label="Room (optional)" placeholder="e.g. Room 201" />
                        <Select
                            name="status"
                            label="Status"
                            options={[
                                { value: "active", label: "Active" },
                                { value: "inactive", label: "Inactive" },
                            ]}
                        />
                    </>
                )}
            </MutationFormSheet>

            {deleteId && (
                <ConfirmDialog
                    trigger={<span ref={(el) => { if (el) el.click() }} className="hidden" />}
                    title="Delete Class"
                    description="Are you sure? This will permanently remove this class."
                    confirmLabel="Delete"
                    variant="destructive"
                    onConfirm={() => { handleDelete(); setDeleteId(null) }}
                />
            )}
        </>
    )
}




// ============= TYPES =============
interface ClassRow {
    _id: string
    name: string
    section: string
    grade: number
    academicYear: string
    classTeacherName: string
    studentCount: number
    maxStudents: number
    room: string
    subjects: string[]
    status: string
}

interface TeacherOption { _id: string; name: string }
