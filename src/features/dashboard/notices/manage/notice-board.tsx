"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatusBadge } from "@/components/molecules/status-badge"
import { FilterToolbar, type FilterConfig } from "@/components/molecules/filter-toolbar"
import { DropdownActions, type ActionItem } from "@/components/molecules/dropdown-actions"
import { EmptyState } from "@/components/molecules/empty-state"
import { InfiniteScroll } from "@/components/molecules/infinite-scroll"
import { MutationFormSheet } from "@/components/molecules/mutation-form-sheet"
import { FormInput } from "@/components/molecules/input"
import { Select } from "@/components/molecules/select"
import { DatePicker } from "@/components/molecules/date-picker"
import { Checkbox as CB } from "@/components/ui/checkbox"
import { noticeSchema, type NoticeFormData } from "@/features/dashboard/validators"
import { postOne, patchById, deleteById, patchMarkAsPublished, patchMarkAsArchived } from "@/services/notices"
import { Plus, Send, Archive, Eye, Pencil, Trash2, FileText, Clock } from "lucide-react"
import { toast } from "sonner"
import type { NoticeItem } from "../overview/types"
import { Notice } from "@/services"

const PAGE_SIZE = 12

// ============= NOTICE BOARD LIST =============
export function NoticeBoard({
    initialNotices,
    initialTotal,
    initialHasMore,
}: {
    initialNotices: NoticeItem[]
    initialTotal: number
    initialHasMore: boolean
}) {
    const [notices, setNotices] = React.useState(initialNotices)
    const [page, setPage] = React.useState(1)
    const [hasMore, setHasMore] = React.useState(initialHasMore)
    const [total, setTotal] = React.useState(initialTotal)
    const [isLoading, setIsLoading] = React.useState(false)

    const [search, setSearch] = React.useState("")
    const [statusFilter, setStatusFilter] = React.useState("all")
    const [priorityFilter, setPriorityFilter] = React.useState("all")

    const [confirmAction, setConfirmAction] = React.useState<{ type: "publish" | "archive" | "delete"; notice: NoticeItem } | null>(null)
    const [formOpen, setFormOpen] = React.useState(false)
    const [editNotice, setEditNotice] = React.useState<NoticeItem | null>(null)
    const [detailNotice, setDetailNotice] = React.useState<NoticeItem | null>(null)

    const searchTimeout = React.useRef<ReturnType<typeof setTimeout>>(null)

    // Fetch notices with filters (resets list)
    const fetchFiltered = React.useCallback(async (s: string, status: string, priority: string) => {
        setIsLoading(true)
        try {
            const result = await Notice.getPaginated(1, PAGE_SIZE, {
                search: s || undefined,
                status: status !== "all" ? status : undefined,
                priority: priority !== "all" ? priority : undefined,
            })
            setNotices(result.items as NoticeItem[])
            setPage(1)
            setHasMore(result.hasMore)
            setTotal(result.total)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Load next page (appends)
    const loadMore = React.useCallback(async () => {
        if (isLoading || !hasMore) return
        setIsLoading(true)
        try {
            const nextPage = page + 1
            const result = await Notice.getPaginated(nextPage, PAGE_SIZE, {
                search: search || undefined,
                status: statusFilter !== "all" ? statusFilter : undefined,
                priority: priorityFilter !== "all" ? priorityFilter : undefined,
            })
            setNotices((prev) => [...prev, ...(result.items as NoticeItem[])])
            setPage(nextPage)
            setHasMore(result.hasMore)
            setTotal(result.total)
        } finally {
            setIsLoading(false)
        }
    }, [isLoading, hasMore, page, search, statusFilter, priorityFilter])

    // Debounced search handler
    const handleSearchChange = (value: string) => {
        setSearch(value)
        if (searchTimeout.current) clearTimeout(searchTimeout.current)
        searchTimeout.current = setTimeout(() => {
            fetchFiltered(value, statusFilter, priorityFilter)
        }, 400)
    }

    // Filter change handlers (immediate)
    const handleStatusChange = (value: string) => {
        setStatusFilter(value)
        fetchFiltered(search, value, priorityFilter)
    }
    const handlePriorityChange = (value: string) => {
        setPriorityFilter(value)
        fetchFiltered(search, statusFilter, value)
    }

    const filters: FilterConfig[] = [
        {
            key: "status",
            placeholder: "Status",
            value: statusFilter,
            options: [
                { value: "draft", label: "Draft" },
                { value: "published", label: "Published" },
                { value: "archived", label: "Archived" },
            ],
            onChange: handleStatusChange,
        },
        {
            key: "priority",
            placeholder: "Priority",
            value: priorityFilter,
            options: [
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
                { value: "urgent", label: "Urgent" },
            ],
            onChange: handlePriorityChange,
        },
    ]

    const openCreate = () => {
        setEditNotice(null)
        setFormOpen(true)
    }

    const openEdit = (notice: NoticeItem) => {
        setEditNotice(notice)
        setFormOpen(true)
    }

    const getActions = (notice: NoticeItem): ActionItem[] => [
        { label: "View", icon: Eye, onClick: () => setDetailNotice(notice) },
        { label: "Edit", icon: Pencil, onClick: () => openEdit(notice) },
        { separator: true },
        ...(notice.status === "draft"
            ? [{ label: "Publish", icon: Send, onClick: () => setConfirmAction({ type: "publish", notice }) }]
            : []),
        ...(notice.status === "published"
            ? [{ label: "Archive", icon: Archive, onClick: () => setConfirmAction({ type: "archive", notice }) }]
            : []),
        { separator: true },
        { label: "Delete", icon: Trash2, destructive: true, onClick: () => setConfirmAction({ type: "delete", notice }) },
    ]

    return (
        <div className="space-y-4">
            <FilterToolbar
                searchValue={search}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search by title or author..."
                filters={filters}
            >
                <div className="flex items-center gap-3 ml-auto">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {total} notice{total !== 1 ? "s" : ""}
                    </span>
                    <Button onClick={openCreate}>
                        <Plus className="mr-2 size-4" />
                        Create Notice
                    </Button>
                </div>
            </FilterToolbar>

            {notices.length === 0 && !isLoading ? (
                <EmptyState
                    icon={FileText}
                    title="No notices found"
                    description="Create your first notice to get started or adjust your filters."
                />
            ) : (
                <InfiniteScroll
                    hasMore={hasMore}
                    isLoading={isLoading}
                    onLoadMore={loadMore}
                    total={total}
                >
                    {notices.map((notice) => (
                        <NoticeCard
                            key={notice._id}
                            notice={notice}
                            actions={getActions(notice)}
                            onView={() => setDetailNotice(notice)}
                        />
                    ))}
                </InfiniteScroll>
            )}

            {/* Create / Edit Form Sheet */}
            <NoticeFormSheet
                open={formOpen}
                onOpenChange={setFormOpen}
                notice={editNotice}
            />

            {/* Detail View Sheet */}
            <NoticeDetailSheet
                notice={detailNotice}
                onClose={() => setDetailNotice(null)}
            />

            {/* Confirm Action Dialog */}
            <AlertDialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {confirmAction?.type === "publish" && "Publish Notice"}
                            {confirmAction?.type === "archive" && "Archive Notice"}
                            {confirmAction?.type === "delete" && "Delete Notice"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {confirmAction?.type === "publish" && "This will make the notice visible to its target audience. Continue?"}
                            {confirmAction?.type === "archive" && "This will remove the notice from active view. Continue?"}
                            {confirmAction?.type === "delete" && "This action cannot be undone. The notice will be permanently deleted."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className={confirmAction?.type === "delete" ? "bg-destructive text-white hover:bg-destructive/90" : ""}
                            onClick={async () => {
                                if (!confirmAction) return
                                const { type, notice: n } = confirmAction
                                let result
                                if (type === "publish") result = await patchMarkAsPublished(n._id)
                                else if (type === "archive") result = await patchMarkAsArchived(n._id)
                                else result = await deleteById(n._id)

                                if (result.success) {
                                    toast.success(result.message)
                                    // Re-fetch current view after mutation
                                    fetchFiltered(search, statusFilter, priorityFilter)
                                } else {
                                    toast.error(result.error)
                                }
                                setConfirmAction(null)
                            }}
                        >
                            {confirmAction?.type === "publish" && "Publish"}
                            {confirmAction?.type === "archive" && "Archive"}
                            {confirmAction?.type === "delete" && "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}


// ============= NOTICE CARD (inspired by screenshot) =============
function NoticeCard({ notice, actions, onView }: { notice: NoticeItem; actions: ActionItem[]; onView: () => void }) {
    return (
        <Card className="transition-shadow hover:shadow-md cursor-pointer group gap-0" onClick={onView}>
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <FileText className="size-5" />
                        </div>
                        <div className="min-w-0">
                            <CardTitle className="text-base font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                                {notice.title}
                            </CardTitle>
                            <CardDescription className="text-xs">
                                By {notice.authorName}
                            </CardDescription>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <span className="text-xs text-muted-foreground hidden sm:inline">{notice.publishDate}</span>
                        <StatusBadge status={notice.priority as "low" | "medium" | "high" | "urgent"} />
                        <DropdownActions items={actions} />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: notice.content }}
                />
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <StatusBadge status={notice.status as "draft" | "published" | "archived"} />
                    {notice.targetAudience.map((a) => (
                        <Badge key={a} variant="outline" className="text-[10px] capitalize px-1.5">
                            {a}
                        </Badge>
                    ))}
                    {notice.expiryDate && (
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Clock className="size-3" />
                            Expires {notice.expiryDate}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

// ============= NOTICE FORM SHEET =============
function NoticeFormSheet({ open, onOpenChange, notice }: { open: boolean; onOpenChange: (v: boolean) => void; notice: NoticeItem | null }) {
    const isEdit = !!notice

    const defaultValues: NoticeFormData = notice
        ? {
            title: notice.title,
            content: notice.content,
            priority: notice.priority as NoticeFormData["priority"],
            targetAudience: notice.targetAudience as NoticeFormData["targetAudience"],
            publishDate: notice.publishDate,
            expiryDate: notice.expiryDate || undefined,
            status: notice.status as NoticeFormData["status"],
        }
        : {
            title: "",
            content: "",
            priority: "medium",
            targetAudience: ["all"],
            publishDate: new Date().toISOString().split("T")[0],
            expiryDate: undefined,
            status: "draft",
        }

    return (
        <MutationFormSheet<NoticeFormData>
            open={open}
            onOpenChange={onOpenChange}
            title={isEdit ? "Edit Notice" : "Create Notice"}
            description={isEdit ? "Update the notice details below." : "Fill in the details to create a new notice."}
            schema={noticeSchema}
            defaultValues={defaultValues}
            onSubmit={async (data) => {
                if (isEdit && notice) {
                    return patchById(notice._id, data)
                }
                return postOne(data)
            }}
            submitLabel={isEdit ? "Update" : "Create"}
        >
            {(form) => (
                <>
                    <FormInput
                        name="title"
                        label="Title"
                        placeholder="Enter notice title"
                    />
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Content</label>
                        <textarea
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                            placeholder="Write your notice content..."
                            {...form.register("content")}
                        />
                        {form.formState.errors.content && (
                            <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
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
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Target Audience</label>
                        <div className="grid grid-cols-2 gap-2">
                            {(["all", "admin", "teacher", "student", "parent"] as const).map((audience) => {
                                const current = form.watch("targetAudience") || []
                                const checked = current.includes(audience)
                                return (
                                    <label key={audience} className="flex items-center gap-2 text-sm cursor-pointer">
                                        <CB
                                            checked={checked}
                                            onCheckedChange={(v) => {
                                                if (v) form.setValue("targetAudience", [...current, audience])
                                                else form.setValue("targetAudience", current.filter((a) => a !== audience))
                                            }}
                                        />
                                        {audience.charAt(0).toUpperCase() + audience.slice(1)}
                                    </label>
                                )
                            })}
                        </div>
                        {form.formState.errors.targetAudience && (
                            <p className="text-sm text-destructive">{form.formState.errors.targetAudience.message}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <DatePicker name="publishDate" label="Publish Date" placeholder="Select publish date" />
                        <DatePicker name="expiryDate" label="Expiry Date" placeholder="Select expiry date" />
                    </div>
                </>
            )}
        </MutationFormSheet>
    )
}


// ============= NOTICE DETAIL SHEET =============
function NoticeDetailSheet({ notice, onClose }: { notice: NoticeItem | null; onClose: () => void }) {
    if (!notice) return null

    return (
        <Sheet open={!!notice} onOpenChange={() => onClose()}>
            <SheetContent side="right" className="sm:max-w-lg px-2">
                <SheetHeader>
                    <SheetTitle>{notice.title}</SheetTitle>
                    <SheetDescription>By {notice.authorName} · {notice.publishDate}</SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-1 px-4 py-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 flex-wrap">
                            <StatusBadge status={notice.status as "draft" | "published" | "archived"} />
                            <StatusBadge status={notice.priority as "low" | "medium" | "high" | "urgent"} />
                        </div>
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                            <div dangerouslySetInnerHTML={{ __html: notice.content }} />
                        </div>
                        <div className="space-y-3 text-sm border-t pt-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Target Audience</span>
                                <div className="flex gap-1">
                                    {notice.targetAudience.map((a) => (
                                        <Badge key={a} variant="outline" className="text-[10px] capitalize">
                                            {a}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            {notice.expiryDate && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Expires</span>
                                    <span>{notice.expiryDate}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Status</span>
                                <StatusBadge status={notice.status as "draft" | "published" | "archived"} />
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
