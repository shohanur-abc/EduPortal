"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { AdvancedDataTable, SortableHeader } from "@/components/molecules/advanced-data-table"
import { DropdownActions } from "@/components/molecules/dropdown-actions"
import { ConfirmDialog } from "@/components/molecules/confirm-dialog"
import { MutationFormSheet } from "@/components/molecules/mutation-form-sheet"
import { StatusBadge } from "@/components/molecules/status-badge"
import { FormInput } from "@/components/molecules/input"
import { Select } from "@/components/molecules/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { noticeSchema, type NoticeFormData } from "@/features/dashboard/validators"
import { createNotice, updateNotice, deleteNotice, publishNotice, archiveNotice } from "@/features/dashboard/actions/mutations"
import { Plus, Edit, Trash2, Send, Archive } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { EmptyState } from "@/components/molecules/empty-state"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertTriangle, FileText } from "lucide-react"


// ============= MANAGE SECTION =============
export function NoticesManageSection({ notices, loading }: { notices: NoticeRow[], loading?: boolean }) {
    if (notices.length === 0 && !loading) {
        return (
            <EmptyState
                title="No Notices Found"
                description="There are no notices to manage yet. Create a new notice to get started."
                icon={FileText}
            />
        )
    }

    const expiredCount = notices.filter((n) => isExpired(n.expiryDate) && n.status === "published").length

    return (
        <div className="space-y-6">
            {expiredCount > 0 && (
                <Card className="border-amber-200 dark:border-amber-900">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base text-amber-700 dark:text-amber-400">
                            <AlertTriangle className="size-4" />
                            {expiredCount} Notice{expiredCount > 1 ? "s" : ""} Past Expiry
                        </CardTitle>
                        <CardDescription>
                            These notices have passed their expiry date but are still published. Consider archiving them.
                        </CardDescription>
                    </CardHeader>
                </Card>
            )}

            <NoticesCrudTable notices={notices} loading={loading} />
        </div>
    )
}

// ============= COLUMN DEFS =============
function useNoticeColumns(onEdit: (row: NoticeRow) => void, onDelete: (id: string) => void) {
    const router = useRouter()

    const columns: ColumnDef<NoticeRow>[] = React.useMemo(() => [
        {
            accessorKey: "title",
            header: ({ column }) => <SortableHeader column={column} title="Title" />,
            cell: ({ row }) => (
                <div className="flex flex-col gap-0.5 max-w-xs">
                    <span className="font-medium">{row.original.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                        {row.original.content.length > 60
                            ? row.original.content.slice(0, 60) + "…"
                            : row.original.content}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "authorName",
            header: "Author",
        },
        {
            accessorKey: "targetAudience",
            header: "Audience",
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.targetAudience.map((a) => (
                        <Badge key={a} variant="outline" className="text-xs">{a}</Badge>
                    ))}
                </div>
            ),
            filterFn: (row, _id, filterValue) => {
                if (!filterValue || filterValue === "all") return true
                return row.original.targetAudience.includes(filterValue)
            },
        },
        {
            accessorKey: "priority",
            header: ({ column }) => <SortableHeader column={column} title="Priority" />,
            cell: ({ row }) => <StatusBadge status={row.original.priority as "low" | "medium" | "high" | "urgent"} />,
        },
        {
            accessorKey: "status",
            header: ({ column }) => <SortableHeader column={column} title="Status" />,
            cell: ({ row }) => <StatusBadge status={row.original.status as "draft" | "published" | "archived"} />,
        },
        {
            accessorKey: "publishDate",
            header: ({ column }) => <SortableHeader column={column} title="Published" />,
            cell: ({ row }) => (
                <span className="text-sm tabular-nums">
                    {row.original.publishDate ? new Date(row.original.publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                </span>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const notice = row.original
                return (
                    <DropdownActions
                        items={[
                            { label: "Edit", icon: Edit, onClick: () => onEdit(notice) },
                            ...(notice.status === "draft"
                                ? [{
                                    label: "Publish",
                                    icon: Send,
                                    onClick: async () => {
                                        const result = await publishNotice(notice._id)
                                        if (result.success) { toast.success(result.message); router.refresh() }
                                        else toast.error(result.error)
                                    },
                                }]
                                : []),
                            ...(notice.status === "published"
                                ? [{
                                    label: "Archive",
                                    icon: Archive,
                                    onClick: async () => {
                                        const result = await archiveNotice(notice._id)
                                        if (result.success) { toast.success(result.message); router.refresh() }
                                        else toast.error(result.error)
                                    },
                                }]
                                : []),
                            { separator: true },
                            {
                                label: "Delete",
                                icon: Trash2,
                                destructive: true,
                                onClick: () => onDelete(notice._id),
                            },
                        ]}
                    />
                )
            },
        },
    ], [onEdit, onDelete, router])

    return columns
}

// ============= DEFAULT VALUES =============
const emptyNotice: NoticeFormData = {
    title: "",
    content: "",
    priority: "medium",
    targetAudience: ["all"],
    publishDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
    status: "draft",
}

// ============= MAIN COMPONENT =============
export function NoticesCrudTable({ notices, loading }: { notices: NoticeRow[], loading?: boolean }) {
    const router = useRouter()
    const [formOpen, setFormOpen] = React.useState(false)
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [defaults, setDefaults] = React.useState<NoticeFormData>(emptyNotice)
    const [deleteId, setDeleteId] = React.useState<string | null>(null)

    const handleEdit = (row: NoticeRow) => {
        setEditingId(row._id)
        setDefaults({
            title: row.title,
            content: row.content,
            priority: row.priority as NoticeFormData["priority"],
            targetAudience: row.targetAudience as NoticeFormData["targetAudience"],
            publishDate: row.publishDate,
            expiryDate: row.expiryDate,
            status: row.status as NoticeFormData["status"],
        })
        setFormOpen(true)
    }

    const handleCreate = () => {
        setEditingId(null)
        setDefaults(emptyNotice)
        setFormOpen(true)
    }

    const handleDelete = async () => {
        if (!deleteId) return
        const result = await deleteNotice(deleteId)
        if (result.success) { toast.success(result.message); router.refresh() }
        else toast.error(result.error)
        setDeleteId(null)
    }

    const columns = useNoticeColumns(handleEdit, setDeleteId)

    return (
        <>
            <AdvancedDataTable
                title="All Notices"
                description="Manage notices — create, edit, publish, archive, or delete"
                columns={columns}
                data={notices}
                searchKey="title"
                searchPlaceholder="Search notices..."
                toolbar={
                    <Button size="sm" onClick={handleCreate}>
                        <Plus className="mr-2 size-4" /> New Notice
                    </Button>
                }
                loading={loading}
            />

            <MutationFormSheet<NoticeFormData>
                open={formOpen}
                onOpenChange={setFormOpen}
                title={editingId ? "Edit Notice" : "Create Notice"}
                description={editingId ? "Update notice details" : "Fill in the details to create a new notice"}
                schema={noticeSchema}
                defaultValues={defaults}
                submitLabel={editingId ? "Update" : "Create"}
                onSubmit={async (data) => {
                    if (editingId) return updateNotice(editingId, data)
                    return createNotice(data)
                }}
            >
                {() => (
                    <>
                        <FormInput name="title" label="Title" placeholder="Notice title" />
                        <FormInput name="content" label="Content" placeholder="Notice content..." />
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                name="priority"
                                label="Priority"
                                options={[
                                    { value: "low", label: "Low" },
                                    { value: "medium", label: "Medium" },
                                    { value: "high", label: "High" },
                                    { value: "urgent", label: "Urgent" },
                                ]}
                            />
                            <Select
                                name="status"
                                label="Status"
                                options={[
                                    { value: "draft", label: "Draft" },
                                    { value: "published", label: "Published" },
                                    { value: "archived", label: "Archived" },
                                ]}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="publishDate" label="Publish Date" type="date" />
                            <FormInput name="expiryDate" label="Expiry Date" type="date" />
                        </div>
                    </>
                )}
            </MutationFormSheet>

            <ConfirmDialog
                trigger={<span className="hidden" />}
                title="Delete Notice"
                description="Are you sure you want to delete this notice? This action cannot be undone."
                confirmLabel="Delete"
                variant="destructive"
                onConfirm={handleDelete}
            />
            {/* Hidden confirm dialog trigger — use open state instead */}
            {deleteId && (
                <ConfirmDeleteDialog
                    open={!!deleteId}
                    onClose={() => setDeleteId(null)}
                    onConfirm={handleDelete}
                    title="Delete Notice"
                    description="Are you sure you want to delete this notice? This action cannot be undone."
                />
            )}
        </>
    )
}

// ============= PUBLISH FORM =============
export function NoticePublishForm() {
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)} size="lg" className="gap-2">
                <Send className="size-4" />
                Create & Publish Notice
            </Button>

            <MutationFormSheet<NoticeFormData>
                open={open}
                onOpenChange={setOpen}
                title="Publish New Notice"
                description="Create and immediately publish a notice"
                schema={noticeSchema}
                defaultValues={{ ...emptyNotice, status: "published" }}
                submitLabel="Publish"
                onSubmit={async (data) => createNotice({ ...data, status: "published" })}
            >
                {() => (
                    <>
                        <FormInput name="title" label="Title" placeholder="Notice title" />
                        <FormInput name="content" label="Content" placeholder="Write your notice content..." />
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                name="priority"
                                label="Priority"
                                options={[
                                    { value: "low", label: "Low" },
                                    { value: "medium", label: "Medium" },
                                    { value: "high", label: "High" },
                                    { value: "urgent", label: "Urgent" },
                                ]}
                            />
                            <Select
                                name="status"
                                label="Status"
                                options={[
                                    { value: "draft", label: "Draft" },
                                    { value: "published", label: "Published" },
                                ]}
                            />
                        </div>
                        <FormInput name="publishDate" label="Publish Date" type="date" />
                        <FormInput name="expiryDate" label="Expiry Date (optional)" type="date" />
                    </>
                )}
            </MutationFormSheet>
        </>
    )
}

// ============= INLINE CONFIRM DIALOG =============
function ConfirmDeleteDialog({ open, onClose, onConfirm, title, description }: {
    open: boolean; onClose: () => void; onConfirm: () => void; title: string; description: string
}) {
    return (
        <ConfirmDialog
            trigger={<span ref={(el) => { if (el && open) el.click() }} className="hidden" />}
            title={title}
            description={description}
            confirmLabel="Delete"
            variant="destructive"
            onConfirm={() => { onConfirm(); onClose() }}
        />
    )
}



// ============= HELPERS =============
function isExpired(expiryDate: string) {
    if (!expiryDate) return false
    return new Date(expiryDate) < new Date()
}

// ============= TYPES =============
interface NoticeRow {
    _id: string
    title: string
    content: string
    authorName: string
    priority: string
    targetAudience: string[]
    publishDate: string
    expiryDate: string
    status: string
}

