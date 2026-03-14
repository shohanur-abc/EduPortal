"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTable, SortableHeader } from "@/components/molecules/table"
import { DropdownActions } from "@/components/molecules/dropdown-actions"
import { ConfirmDialog } from "@/components/molecules/confirm-dialog"
import { MutationFormSheet } from "@/components/molecules/mutation-form-sheet"
import { StatusBadge } from "@/components/molecules/status-badge"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { FormInput } from "@/components/molecules"
import { Select } from "@/components/molecules"
import { Button } from "@/components/ui/button"
import { studentSchema, type StudentFormData } from "@/schemas/dashboard"
import { createStudent, updateStudent, deleteStudent } from "@/services/students"
import { Plus, Edit, Trash2 } from "@/lib/icon"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


// ============= MAIN COMPONENT =============
export function StudentsCrudTable({ students, classes, loading }: { students: StudentRow[]; classes: ClassOption[]; loading?: boolean }) {
    const router = useRouter()
    const [formOpen, setFormOpen] = React.useState(false)
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [defaults, setDefaults] = React.useState<StudentFormData>(emptyStudent)
    const [deleteId, setDeleteId] = React.useState<string | null>(null)

    const handleEdit = (row: StudentRow) => {
        setEditingId(row._id)
        setDefaults({
            name: row.name,
            email: row.email,
            rollNumber: row.rollNumber,
            classId: "",
            section: row.section,
            guardianName: row.guardianName,
            guardianPhone: row.guardianPhone,
            guardianEmail: "",
            dateOfBirth: row.dateOfBirth,
            gender: row.gender as StudentFormData["gender"],
            address: "",
            status: row.status as StudentFormData["status"],
        })
        setFormOpen(true)
    }

    const handleCreate = () => {
        setEditingId(null)
        setDefaults(emptyStudent)
        setFormOpen(true)
    }

    const handleDelete = async () => {
        if (!deleteId) return
        const result = await deleteStudent(deleteId)
        if (result.success) { toast.success(result.message); router.refresh() }
        else toast.error(result.error)
        setDeleteId(null)
    }

    const columns: ColumnDef<StudentRow>[] = React.useMemo(() => [
        {
            accessorKey: "name",
            header: ({ column }) => <SortableHeader column={column} title="Name" />,
            cell: ({ row }) => <AvatarCell name={row.original.name} secondary={row.original.email} />,
        },
        {
            accessorKey: "rollNumber",
            header: ({ column }) => <SortableHeader column={column} title="Roll No." />,
        },
        {
            accessorKey: "section",
            header: "Section",
        },
        {
            accessorKey: "guardianName",
            header: "Guardian",
        },
        {
            accessorKey: "guardianPhone",
            header: "Contact",
            cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.guardianPhone}</span>,
        },
        {
            accessorKey: "gender",
            header: "Gender",
            cell: ({ row }) => <span className="capitalize text-sm">{row.original.gender || "—"}</span>,
        },
        {
            accessorKey: "status",
            header: ({ column }) => <SortableHeader column={column} title="Status" />,
            cell: ({ row }) => <StatusBadge status={row.original.status as "active" | "inactive" | "graduated" | "transferred"} />,
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
                title="Students"
                description="Manage student records"
                columns={columns}
                data={students}
                searchKey="name"
                searchPlaceholder="Search students..."
                toolbar={
                    <Button size="sm" onClick={handleCreate}>
                        <Plus className="mr-2 size-4" /> Add Student
                    </Button>
                }
                loading={loading}
            />

            <MutationFormSheet<StudentFormData>
                open={formOpen}
                onOpenChange={setFormOpen}
                title={editingId ? "Edit Student" : "Add Student"}
                description={editingId ? "Update student information" : "Enter new student details"}
                schema={studentSchema}
                defaultValues={defaults}
                submitLabel={editingId ? "Update" : "Create"}
                onSubmit={async (data) => {
                    if (editingId) return updateStudent(editingId, data)
                    return createStudent(data)
                }}
            >
                {() => (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="name" label="Full Name" placeholder="Student name" />
                            <FormInput name="email" label="Email" type="email" placeholder="student@email.com" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="rollNumber" label="Roll Number" placeholder="e.g. 2025-001" />
                            <Select
                                name="classId"
                                label="Class"
                                placeholder="Select class"
                                options={classes.map((c) => ({ value: c._id, label: `${c.name} (${c.section})` }))}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="section" label="Section" placeholder="e.g. A" />
                            <Select
                                name="gender"
                                label="Gender"
                                options={[
                                    { value: "male", label: "Male" },
                                    { value: "female", label: "Female" },
                                    { value: "other", label: "Other" },
                                ]}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="guardianName" label="Guardian Name" placeholder="Guardian name" />
                            <FormInput name="guardianPhone" label="Guardian Phone" placeholder="+880..." />
                        </div>
                        <FormInput name="guardianEmail" label="Guardian Email (optional)" type="email" placeholder="guardian@email.com" />
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="dateOfBirth" label="Date of Birth" type="date" />
                            <Select
                                name="status"
                                label="Status"
                                options={[
                                    { value: "active", label: "Active" },
                                    { value: "inactive", label: "Inactive" },
                                    { value: "graduated", label: "Graduated" },
                                    { value: "transferred", label: "Transferred" },
                                ]}
                            />
                        </div>
                        <FormInput name="address" label="Address (optional)" placeholder="Student address" />
                    </>
                )}
            </MutationFormSheet>

            {deleteId && (
                <ConfirmDialog
                    trigger={<span ref={(el) => { if (el) el.click() }} className="hidden" />}
                    title="Delete Student"
                    description="Are you sure? This will permanently remove this student record."
                    confirmLabel="Delete"
                    variant="destructive"
                    onConfirm={() => { handleDelete(); setDeleteId(null) }}
                />
            )}
        </>
    )
}


// ============= TYPES =============
interface StudentRow {
    _id: string
    name: string
    email: string
    rollNumber: string
    section: string
    guardianName: string
    guardianPhone: string
    status: string
    gender: string
    dateOfBirth: string
    admissionDate: string
}

interface ClassOption { _id: string; name: string; section: string }

// ============= DEFAULTS =============
const emptyStudent: StudentFormData = {
    name: "",
    email: "",
    rollNumber: "",
    classId: "",
    section: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    dateOfBirth: "",
    gender: undefined,
    address: "",
    status: "active",
}
