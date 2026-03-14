"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTable, SortableHeader } from "@/components/molecules/table"
import { DropdownActions } from "@/components/molecules/dropdown-actions"
import { ConfirmDialog } from "@/components/molecules/confirm-dialog"
import { MutationFormSheet } from "@/components/molecules/mutation-form-sheet"
import { StatusBadge } from "@/components/molecules/status-badge"
import { FormInput } from "@/components/molecules"
import { Select } from "@/components/molecules"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { feeSchema, feePaymentSchema, type FeeFormData, type FeePaymentData } from "@/schemas/dashboard"
import { createFee, recordFeePayment, waiveFee, deleteFee } from "@/services/fees"
import { Plus, Trash2, CreditCard, Ban, DollarSign } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


// ============= DEFAULTS =============
const emptyFee: FeeFormData = {
    student: "",
    type: "tuition",
    amount: 0,
    dueDate: "",
    academicYear: "2025-2026",
    month: "",
    remarks: "",
}

const emptyPayment: FeePaymentData = {
    paidAmount: 0,
    paymentMethod: "cash",
    paidDate: new Date().toISOString().split("T")[0],
    receiptNumber: "",
}

import { EmptyState } from "@/components/molecules/empty-state"


// ============= COLLECTION SECTION =============
export function FeesCollectionSection({ records, students, loading }: { records: FeeRecord[]; students: StudentOption[]; loading?: boolean }) {
    if (records.length === 0) {
        return (
            <EmptyState
                title="No Payments Recorded"
                description="There are no fee payments recorded yet. Payments will appear here once students begin making payments."
                icon={CreditCard}
            />
        )
    }

    return <FeesCrudTable records={records} students={students} loading={loading} />
}

// ============= TRACKING SECTION =============
export function FeesTrackingSection({ records, students, loading }: { records: FeeRecord[]; students: StudentOption[], loading?: boolean }) {
    if (records.length === 0) {
        return (
            <EmptyState
                title="No Fee Records"
                description="There are no fee records to track. Records will appear here once fees are assigned to students."
                icon={DollarSign}
            />
        )
    }

    return <FeesCrudTable records={records} students={students} loading={loading} />
}





// ============= FEES CRUD TABLE =============
export function FeesCrudTable({ records, students, loading }: { records: FeeRecord[]; students: StudentOption[]; loading?: boolean }) {
    const router = useRouter()
    const [createOpen, setCreateOpen] = React.useState(false)
    const [paymentOpen, setPaymentOpen] = React.useState(false)
    const [paymentId, setPaymentId] = React.useState<string | null>(null)
    const [paymentDefaults, setPaymentDefaults] = React.useState<FeePaymentData>(emptyPayment)
    const [deleteId, setDeleteId] = React.useState<string | null>(null)

    const handlePayment = (row: FeeRecord) => {
        setPaymentId(row._id)
        setPaymentDefaults({
            ...emptyPayment,
            paidAmount: row.amount - row.paidAmount,
        })
        setPaymentOpen(true)
    }

    const handleWaive = async (id: string) => {
        const result = await waiveFee(id)
        if (result.success) { toast.success(result.message); router.refresh() }
        else toast.error(result.error)
    }

    const handleDelete = async () => {
        if (!deleteId) return
        const result = await deleteFee(deleteId)
        if (result.success) { toast.success(result.message); router.refresh() }
        else toast.error(result.error)
        setDeleteId(null)
    }

    const columns: ColumnDef<FeeRecord>[] = React.useMemo(() => [
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
        {
            accessorKey: "type",
            header: ({ column }) => <SortableHeader column={column} title="Type" />,
            cell: ({ row }) => <Badge variant="outline" className="capitalize">{row.original.type}</Badge>,
        },
        {
            accessorKey: "amount",
            header: ({ column }) => <SortableHeader column={column} title="Amount" />,
            cell: ({ row }) => <span className="font-medium tabular-nums">৳{row.original.amount.toLocaleString()}</span>,
        },
        {
            accessorKey: "paidAmount",
            header: "Paid",
            cell: ({ row }) => <span className="tabular-nums text-green-700">৳{row.original.paidAmount.toLocaleString()}</span>,
        },
        {
            accessorKey: "paidDate",
            header: ({ column }) => <SortableHeader column={column} title="Paid Date" />,
            cell: ({ row }) => (
                <span className="text-sm tabular-nums">
                    {row.original.paidDate ? new Date(row.original.paidDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                </span>
            ),
        },
        {
            accessorKey: "dueDate",
            header: ({ column }) => <SortableHeader column={column} title="Due Date" />,
            cell: ({ row }) => (
                <span className="text-sm tabular-nums">
                    {row.original.dueDate ? new Date(row.original.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: ({ column }) => <SortableHeader column={column} title="Status" />,
            cell: ({ row }) => <StatusBadge status={row.original.status as "paid" | "unpaid" | "partial" | "overdue" | "waived"} />,
        },
        {
            accessorKey: "paymentMethod",
            header: "Method",
            cell: ({ row }) => <span className="text-sm capitalize">{row.original.paymentMethod || "—"}</span>,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const fee = row.original
                const canPay = ["unpaid", "partial", "overdue"].includes(fee.status)
                const canWaive = ["unpaid", "overdue"].includes(fee.status)
                return (
                    <DropdownActions
                        items={[
                            ...(canPay ? [{ label: "Record Payment", icon: CreditCard, onClick: () => handlePayment(fee) }] : []),
                            ...(canWaive ? [{ label: "Waive Fee", icon: Ban, onClick: () => handleWaive(fee._id) }] : []),
                            { separator: true },
                            { label: "Delete", icon: Trash2, destructive: true, onClick: () => setDeleteId(fee._id) },
                        ]}
                    />
                )
            },
        },
    ], [handleWaive])

    return (
        <>
            <DataTable
                title="Fee Records"
                description="Manage fee records — create, collect payment, waive, or delete"
                columns={columns}
                data={records}
                searchKey="studentName"
                searchPlaceholder="Search by student..."
                toolbar={
                    <Button size="sm" onClick={() => setCreateOpen(true)}>
                        <Plus className="mr-2 size-4" /> Create Fee
                    </Button>
                }
                loading={loading}
            />

            {/* Create Fee Sheet */}
            <MutationFormSheet<FeeFormData>
                open={createOpen}
                onOpenChange={setCreateOpen}
                title="Create Fee Record"
                description="Assign a new fee to a student"
                schema={feeSchema}
                defaultValues={emptyFee}
                submitLabel="Create"
                onSubmit={async (data) => createFee(data)}
            >
                {() => (
                    <>
                        <Select
                            name="student"
                            label="Student"
                            placeholder="Select student"
                            options={students.map((s) => ({ value: s._id, label: `${s.name} (${s.rollNumber})` }))}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                name="type"
                                label="Fee Type"
                                options={[
                                    { value: "tuition", label: "Tuition" },
                                    { value: "exam", label: "Exam" },
                                    { value: "library", label: "Library" },
                                    { value: "transport", label: "Transport" },
                                    { value: "hostel", label: "Hostel" },
                                    { value: "other", label: "Other" },
                                ]}
                            />
                            <FormInput name="amount" label="Amount (৳)" type="number" placeholder="0" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="dueDate" label="Due Date" type="date" />
                            <FormInput name="month" label="Month" placeholder="e.g. January" />
                        </div>
                        <FormInput name="academicYear" label="Academic Year" placeholder="2025-2026" />
                        <FormInput name="remarks" label="Remarks (optional)" placeholder="Additional notes..." />
                    </>
                )}
            </MutationFormSheet>

            {/* Record Payment Sheet */}
            <MutationFormSheet<FeePaymentData>
                open={paymentOpen}
                onOpenChange={setPaymentOpen}
                title="Record Payment"
                description="Enter payment details for this fee"
                schema={feePaymentSchema}
                defaultValues={paymentDefaults}
                submitLabel="Record Payment"
                onSubmit={async (data) => {
                    if (!paymentId) return { success: false as const, error: "No fee selected" }
                    return recordFeePayment(paymentId, data)
                }}
            >
                {() => (
                    <>
                        <FormInput name="paidAmount" label="Amount Paid (৳)" type="number" placeholder="0" />
                        <Select
                            name="paymentMethod"
                            label="Payment Method"
                            options={[
                                { value: "cash", label: "Cash" },
                                { value: "card", label: "Card" },
                                { value: "bank-transfer", label: "Bank Transfer" },
                                { value: "online", label: "Online" },
                                { value: "cheque", label: "Cheque" },
                            ]}
                        />
                        <FormInput name="paidDate" label="Payment Date" type="date" />
                        <FormInput name="receiptNumber" label="Receipt Number (optional)" placeholder="REC-..." />
                    </>
                )}
            </MutationFormSheet>

            {deleteId && (
                <ConfirmDialog
                    trigger={<span ref={(el) => { if (el) el.click() }} className="hidden" />}
                    title="Delete Fee Record"
                    description="Are you sure? This will permanently remove this fee record."
                    confirmLabel="Delete"
                    variant="destructive"
                    onConfirm={() => { handleDelete(); setDeleteId(null) }}
                />
            )}
        </>
    )
}



// ============= TYPES =============
interface FeeRecord {
    _id: string
    studentName: string
    rollNumber: string
    type: string
    amount: number
    paidAmount: number
    dueDate: string
    paidDate: string
    status: string
    paymentMethod: string
    receiptNumber: string
    academicYear: string
}

interface StudentOption { _id: string; name: string; rollNumber: string }
