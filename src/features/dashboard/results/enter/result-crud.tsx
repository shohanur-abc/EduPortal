"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { AdvancedDataTable, SortableHeader } from "@/components/molecules/advanced-data-table"
import { DropdownActions } from "@/components/molecules/dropdown-actions"
import { ConfirmDialog } from "@/components/molecules/confirm-dialog"
import { MutationFormSheet } from "@/components/molecules/mutation-form-sheet"
import { FormInput } from "@/components/molecules/input"
import { Select } from "@/components/molecules/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { resultSchema, type ResultFormData } from "@/schemas/dashboard"
import { createResult, updateResult, deleteResult } from "@/services/results"
import { Plus, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


// ============= DEFAULTS =============
const emptyResult: ResultFormData = {
    student: "",
    classId: "",
    exam: "",
    subject: "",
    marks: 0,
    totalMarks: 100,
    academicYear: "2025-2026",
    remarks: "",
}

// ============= MAIN COMPONENT =============
export function ResultsCrudTable({ results, students, classes, loading }: { results: ResultRow[]; students: StudentOption[]; classes: ClassOption[]; loading?: boolean }) {
    const router = useRouter()
    const [formOpen, setFormOpen] = React.useState(false)
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [defaults, setDefaults] = React.useState<ResultFormData>(emptyResult)
    const [deleteId, setDeleteId] = React.useState<string | null>(null)

    const handleEdit = (row: ResultRow) => {
        setEditingId(row._id)
        setDefaults({
            student: "",
            classId: "",
            exam: row.exam,
            subject: row.subject,
            marks: row.marks,
            totalMarks: row.totalMarks,
            academicYear: "2025-2026",
            remarks: "",
        })
        setFormOpen(true)
    }

    const handleCreate = () => {
        setEditingId(null)
        setDefaults(emptyResult)
        setFormOpen(true)
    }

    const handleDelete = async () => {
        if (!deleteId) return
        const result = await deleteResult(deleteId)
        if (result.success) { toast.success(result.message); router.refresh() }
        else toast.error(result.error)
        setDeleteId(null)
    }

    const columns: ColumnDef<ResultRow>[] = React.useMemo(() => [
        {
            accessorKey: "studentName",
            header: ({ column }) => <SortableHeader column={column} title="Student" />,
            cell: ({ row }) => (
                <div>
                    <span className="font-medium">{row.original.studentName}</span>
                    <span className="text-xs text-muted-foreground ml-2">{row.original.rollNumber}</span>
                </div>
            ),
        },
        { accessorKey: "className", header: "Class" },
        {
            accessorKey: "exam",
            header: ({ column }) => <SortableHeader column={column} title="Exam" />,
        },
        {
            accessorKey: "subject",
            header: ({ column }) => <SortableHeader column={column} title="Subject" />,
        },
        {
            accessorKey: "marks",
            header: ({ column }) => <SortableHeader column={column} title="Marks" />,
            cell: ({ row }) => (
                <span className="font-medium tabular-nums">
                    {row.original.marks}/{row.original.totalMarks}
                    <span className="text-xs text-muted-foreground ml-1">
                        ({Math.round((row.original.marks / row.original.totalMarks) * 100)}%)
                    </span>
                </span>
            ),
        },
        {
            accessorKey: "grade",
            header: ({ column }) => <SortableHeader column={column} title="Grade" />,
            cell: ({ row }) => <GradeBadge grade={row.original.grade} />,
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <DropdownActions items={[
                    { label: "Edit", icon: Edit, onClick: () => handleEdit(row.original) },
                    { separator: true },
                    { label: "Delete", icon: Trash2, destructive: true, onClick: () => setDeleteId(row.original._id) },
                ]} />
            ),
        },
    ], [])

    return (
        <>
            <AdvancedDataTable
                title="Results"
                description="Enter, edit, or delete student results"
                columns={columns}
                data={results}
                searchKey="studentName"
                searchPlaceholder="Search by student..."
                toolbar={
                    <Button size="sm" onClick={handleCreate}>
                        <Plus className="mr-2 size-4" /> Enter Result
                    </Button>
                }
                loading={loading}
            />

            <MutationFormSheet<ResultFormData>
                open={formOpen}
                onOpenChange={setFormOpen}
                title={editingId ? "Edit Result" : "Enter Result"}
                description={editingId ? "Update marks and details" : "Enter a new student result"}
                schema={resultSchema}
                defaultValues={defaults}
                submitLabel={editingId ? "Update" : "Save"}
                onSubmit={async (data) => {
                    if (editingId) return updateResult(editingId, data)
                    return createResult(data)
                }}
            >
                {() => (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                name="student"
                                label="Student"
                                placeholder="Select student"
                                options={students.map((s) => ({ value: s._id, label: `${s.name} (${s.rollNumber})` }))}
                            />
                            <Select
                                name="classId"
                                label="Class"
                                placeholder="Select class"
                                options={classes.map((c) => ({ value: c._id, label: `${c.name} (${c.section})` }))}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="exam" label="Exam" placeholder="e.g. Midterm 2025" />
                            <FormInput name="subject" label="Subject" placeholder="e.g. Mathematics" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="marks" label="Marks Obtained" type="number" placeholder="0" />
                            <FormInput name="totalMarks" label="Total Marks" type="number" placeholder="100" />
                        </div>
                        <FormInput name="academicYear" label="Academic Year" placeholder="2025-2026" />
                        <FormInput name="remarks" label="Remarks (optional)" placeholder="Additional notes..." />
                    </>
                )}
            </MutationFormSheet>

            {deleteId && (
                <ConfirmDialog
                    trigger={<span ref={(el) => { if (el) el.click() }} className="hidden" />}
                    title="Delete Result"
                    description="Are you sure? This will permanently remove this result entry."
                    confirmLabel="Delete"
                    variant="destructive"
                    onConfirm={() => { handleDelete(); setDeleteId(null) }}
                />
            )}
        </>
    )
}

// ============= GRADE BADGE =============
function GradeBadge({ grade, loading }: { grade: string; loading?: boolean }) {
    const variant = grade.startsWith("A") ? "default" : grade.startsWith("B") ? "secondary" : grade.startsWith("C") ? "outline" : "destructive"
    return <Badge variant={variant}>{grade}</Badge>
}

