"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTable, SortableHeader } from "@/components/molecules/table"
import { DropdownActions } from "@/components/molecules/dropdown-actions"
import { ConfirmDialog } from "@/components/molecules/confirm-dialog"
import { MutationFormSheet } from "@/components/molecules/mutation-form-sheet"
import { FormInput } from "@/components/molecules"
import { Select } from "@/components/molecules"
import { Button } from "@/components/molecules"
import { type ExpenseFormData, expenseSchema } from "@/schemas/dashboard"
import { createExpense } from "@/services/expenses/post-expense"
import { deleteExpense } from "@/services/expenses/delete-expense"
import { putExpense } from "@/services/expenses/put-expense"
import { Plus, Trash2, Edit, FileText } from "@/lib/icon"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { fmtDate } from "@/utils"

export type ExpenseRecord = {
    _id: string
    expenseId: string
    title: string
    category: string
    quantity?: string
    amount: number
    date: string
    status: string
}

// ============= DEFAULTS =============
const emptyExpense: ExpenseFormData = {
    expenseId: "",
    title: "",
    category: "maintenance",
    quantity: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    status: "paid",
}

// ============= MAIN TABLE COMPONENT =============
export function ExpensesTable({ records, loading }: { records: ExpenseRecord[]; loading?: boolean }) {
    const router = useRouter()
    const [createOpen, setCreateOpen] = React.useState(false)
    const [editOpen, setEditOpen] = React.useState(false)
    const [editId, setEditId] = React.useState<string | null>(null)
    const [editDefaults, setEditDefaults] = React.useState<ExpenseFormData>(emptyExpense)
    const [deleteId, setDeleteId] = React.useState<string | null>(null)


    const handleEdit = (row: ExpenseRecord) => {
        setEditId(row._id)
        setEditDefaults({
            expenseId: row.expenseId,
            title: row.title,
            category: row.category as ExpenseFormData["category"],
            quantity: row.quantity || "",
            amount: row.amount,
            date: new Date(row.date).toISOString().split("T")[0],
            status: row.status as ExpenseFormData["status"],
        })
        setEditOpen(true)
    }


    const handleDelete = async () => {
        if (!deleteId) return
        const result = await deleteExpense(deleteId)
        if (result.success) { toast.success(result.message); router.refresh() }
        else toast.error(result.error)
        setDeleteId(null)
    }

    const columns: ColumnDef<ExpenseRecord>[] = React.useMemo(() => [
        {
            accessorKey: "expenseId",
            header: ({ column }) => <SortableHeader column={column} title="ID" />,
            cell: ({ row }) => <span className="font-medium text-muted-foreground">{row.original.expenseId}</span>,
            meta: { title: "ID" },
        },
        {
            accessorKey: "category",
            header: ({ column }) => <SortableHeader column={column} title="Category" />,
            cell: ({ row }) => <span className="capitalize">{row.original.category.replace("-", " ")}</span>,
            meta: { title: "Category" },
        },
        {
            accessorKey: "title",
            header: ({ column }) => <SortableHeader column={column} title="Expense" />,
            cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
            meta: { title: "Expense" },
        },
        {
            accessorKey: "quantity",
            header: ({ column }) => <SortableHeader column={column} title="Quantity" />,
            cell: ({ row }) => <span>{row.original.quantity || "-"}</span>,
            meta: { title: "Quantity" },
        },
        {
            accessorKey: "amount",
            header: ({ column }) => <SortableHeader column={column} title="Amount" />,
            cell: ({ row }) => <span className="font-semibold">${row.original.amount.toLocaleString()}</span>,
            meta: { title: "Amount" },
        },
        {
            accessorKey: "date",
            header: ({ column }) => <SortableHeader column={column} title="Payment Date" />,
            cell: ({ row }) => <span>{fmtDate(row.original.date)}</span>,
            meta: { title: "Payment Date" },
        },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => (
                // <>
                //     <Button variant="ghost" size="sm" onClick={() => handleEdit(row.original)}><Edit /></Button>
                //     <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.original._id)}><Trash2 /></Button>
                // </>
                <DropdownActions
                    items={[
                        { label: "Edit Record", icon: Edit, onClick: () => handleEdit(row.original) },
                        { label: "Delete", icon: Trash2, destructive: true, onClick: () => setDeleteId(row.original._id) }
                    ]}
                />
            ),
        }
    ], [])


    return (
        <div className="space-y-4">
            <DataTable
                title="School Expenses"
                description="Track and manage school expense records"
                columns={columns}
                data={records?.length ? records : []}
                loading={loading}
                skeletonRows={15}
                searchKey="title"
                searchPlaceholder="Search by ID or Expense..."
                toolbar={(
                    <Button size='sm' onClick={() => setCreateOpen(true)} leftIcon={<Plus />}>Add Expense</Button>
                )}
            />

            {/* CREATE MODAL */}
            <MutationFormSheet<ExpenseFormData>
                open={createOpen}
                onOpenChange={setCreateOpen}
                title="Record Expense"
                description="Add a new expense record."
                schema={expenseSchema}
                defaultValues={emptyExpense}
                onSubmit={createExpense}
            >
                {() => <ExpenseFormFields />}
            </MutationFormSheet>

            {/* EDIT MODAL */}
            <MutationFormSheet<ExpenseFormData>
                open={editOpen}
                onOpenChange={setEditOpen}
                title="Edit Expense"
                description="Update the expense record."
                schema={expenseSchema}
                defaultValues={editDefaults}
                onSubmit={async (data) => editId ? putExpense(editId, data) : { success: false, error: "No ID" }}
            >
                {() => <ExpenseFormFields />}
            </MutationFormSheet>

            {/* DELETE DIALOG */}
            {deleteId && (
                <ConfirmDialog
                    trigger={<span ref={(el) => { if (el) el.click() }} className="hidden" />}
                    title="Delete Expense Record"
                    description="Are you sure you want to delete this expense record? This action cannot be undone."
                    confirmLabel="Delete"
                    variant="destructive"
                    onConfirm={() => { handleDelete(); setDeleteId(null) }}
                />
            )}
        </div>
    )
}

function ExpenseFormFields() {
    return (
        <div className="space-y-4">
            <FormInput name="expenseId" label="Expense ID" placeholder="EX01" required />
            <FormInput name="title" label="Expense Detail" placeholder="Chemicals" required />
            <div className="grid grid-cols-2 gap-4">
                <Select
                    name="category"
                    label="Category"
                    options={[
                        { label: "Laboratory", value: "laboratory" },
                        { label: "Maintenance", value: "maintenance" },
                        { label: "Boarding Equipment", value: "boarding-equipment" },
                        { label: "Library", value: "library" },
                        { label: "Sports", value: "sports" },
                        { label: "IT Infrastructure", value: "it-infrastructure" },
                        { label: "Transportation", value: "transportation" },
                        { label: "Cafeteria", value: "cafeteria" },
                        { label: "Arts & Crafts", value: "arts-crafts" },
                        { label: "Salary", value: "salary" },
                        { label: "Supplies", value: "supplies" },
                        { label: "Utilities", value: "utilities" },
                        { label: "Events", value: "events" },
                        { label: "Other", value: "other" },
                    ]}
                    required
                />
                <FormInput name="quantity" label="Quantity" placeholder="100 units" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <FormInput name="amount" label="Amount" type="number" required />
                <FormInput name="date" label="Payment Date" type="date" required />
            </div>
        </div>
    )
}
