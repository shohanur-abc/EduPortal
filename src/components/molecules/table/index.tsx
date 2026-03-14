"use client"

import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    type Row,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    BarChart3, ChevronDown, Settings,
    ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
    ArrowUp, ArrowDown, MoreHorizontal,
    Search,
} from "@/lib/icon"

import { Table as Table$, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dropdown } from "../"
import { Select } from "../"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { tableRowVariants, tableWrapperVariants, tableHeadVariants, sortableHeaderVariants, skeletonCellVariants } from "./variants"
import type { DataTableProps, DataTableClassNames, RowAction, RowActionItem } from "./types"
import { Input } from "../form"
import { ButtonGroup } from "@/components/ui/button-group"

// ============= SUB-COMPONENTS =============

/** Unstyled sortable column header */
export function SortableHeader({
    column,
    title,
    className,
}: {
    column: { toggleSorting: (desc: boolean) => void; getIsSorted: () => false | "asc" | "desc" }
    title: string
    className?: string
}) {
    const sorted = column.getIsSorted()
    return (
        <button
            type="button"
            className={cn(sortableHeaderVariants({ sorted: !!sorted }), className)}
            onClick={() => column.toggleSorting(sorted === "asc")}
        >
            {title}
            {sorted === "asc" ? (
                <ArrowUp className="size-3" />
            ) : sorted === "desc" ? (
                <ArrowDown className="size-3" />
            ) : (
                <BarChart3 className="size-3 opacity-50" />
            )}
        </button>
    )
}


/** Loading skeleton rows */
function SkeletonRows({
    columns,
    rows,
    density,
    classNames: cns,
}: {
    columns: number
    rows: number
    density?: "compact" | "default" | "comfortable"
    classNames?: DataTableClassNames
}) {
    return (
        <>
            {Array.from({ length: rows }).map((_, rowIdx) => (
                <TableRow key={`skeleton-${rowIdx}`} className={cn(cns?.row, cns?.skeleton)}>
                    {Array.from({ length: columns }).map((_, colIdx) => (
                        <TableCell key={`skeleton-cell-${colIdx}`} className={cn(cns?.td)}>
                            <Skeleton className={cn(skeletonCellVariants({ density }), "w-full")} />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    )
}

// ============= MAIN COMPONENT =============

export function DataTable<TData, TValue = unknown>({
    // data
    columns,
    data,
    // header
    title,
    description,
    // search
    searchKey,
    searchPlaceholder,
    // features
    enableRowSelection = false,
    enableSorting = true,
    enableColumnVisibility = true,
    enablePagination = true,
    pageSize = 15,
    pageSizeOptions = [5, 10, 20, 50],
    // appearance
    density = "default",
    striped = false,
    stickyHeader = false,
    bordered = true,
    // loading
    loading = false,
    skeletonRows = 5,
    // controlled visibility
    columnVisibility: controlledVisibility,
    onColumnVisibilityChange,
    // events
    onRowClick,
    onRowSelectionChange,
    // slots
    emptyState,
    toolbar,
    caption,
    footer,
    // styling
    className,
    classNames: cns,
    // ref
    tableRef,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [internalVisibility, setInternalVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [key, setKey] = React.useState(searchKey) // Used to reset internal state when data changes

    // Merge controlled / internal visibility
    const visibility = controlledVisibility ?? internalVisibility
    const setVisibility = (updaterOrValue: VisibilityState | ((prev: VisibilityState) => VisibilityState)) => {
        const next = typeof updaterOrValue === "function" ? updaterOrValue(visibility) : updaterOrValue
        if (onColumnVisibilityChange) onColumnVisibilityChange(next)
        else setInternalVisibility(next)
    }

    // Build columns with selection + actions columns
    const allColumns = React.useMemo<ColumnDef<TData, TValue>[]>(() => {
        const cols: ColumnDef<TData, TValue>[] = [...columns]

        // Prepend checkbox column
        if (enableRowSelection) {
            const selectCol: ColumnDef<TData, TValue> = {
                id: "__select__",
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? "indeterminate" : false}
                        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(v) => row.toggleSelected(!!v)}
                        aria-label="Select row"
                        onClick={(e) => e.stopPropagation()}
                    />
                ),
                enableSorting: false,
                enableHiding: false,
                size: 40,
            }
            cols.unshift(selectCol)
        }

        // Append row actions column

        return cols
    }, [columns, enableRowSelection])

    const table = useReactTable({
        data,
        columns: allColumns,
        initialState: { pagination: { pageSize } },
        enableSorting,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setVisibility as React.Dispatch<React.SetStateAction<VisibilityState>>,
        onRowSelectionChange: setRowSelection,
        enableRowSelection,
        state: { sorting, columnFilters, columnVisibility: visibility, rowSelection },
    })

    // Expose table instance
    React.useImperativeHandle(tableRef as React.Ref<unknown>, () => table, [table])

    // Fire onRowSelectionChange when selection changes
    React.useEffect(() => {
        if (!onRowSelectionChange) return
        const selectedRows = table.getFilteredSelectedRowModel().rows.map((r: Row<TData>) => r.original)
        onRowSelectionChange(selectedRows)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowSelection])

    const hasHeader = title || description
    const visibleColumns = table.getAllColumns().filter((col) => col.getCanHide())
    const totalColumns = table.getAllColumns().length

    return (
        <Card className={cn(cns?.card, className)}>
            {hasHeader && (
                <CardHeader className={cns?.cardHeader}>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
            )}

            <CardContent className={cn("space-y-4", cns?.cardContent)}>
                {/* ─── Toolbar ─── */}
                {(searchKey || enableColumnVisibility || toolbar) && (
                    <div className={cn("flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", cns?.toolbar)}>
                        <div className="flex flex-1 items-center gap-2">
                            {key && (
                                <>
                                    <ButtonGroup className="*:h-8!">
                                        <Select
                                            defaultValue={key}
                                            onValueChange={setKey}
                                            options={visibleColumns.map(({ id }) => ({ label: String(id), value: String(id) }))}
                                            className="w-35 "
                                            classNames={{ content: 'min-w-auto' }}
                                        />

                                        <Input
                                            placeholder={searchPlaceholder ?? "Search..."}
                                            onChange={(e) => table.getColumn(key)?.setFilterValue(e.target.value)}
                                            className={cn("max-w-xs", cns?.searchInput)}
                                        />
                                    </ButtonGroup>
                                </>
                            )}
                            {toolbar}
                        </div>

                        {enableColumnVisibility && visibleColumns.length > 0 && (
                            <>
                                <Dropdown
                                    trigger={
                                        <Button variant="outline" size="sm" className={cns?.columnsButton}>
                                            <Settings className="mr-2 size-3.5" />
                                            Columns
                                            <ChevronDown className="ml-2 size-3.5" />
                                        </Button>
                                    }
                                    items={visibleColumns.map((column) => ({
                                        label: column.id.replace(/_/g, " "),
                                        type: "checkbox",
                                        checked: column.getIsVisible(),
                                        onCheckedChange: (value) => column.toggleVisibility(!!value),
                                    }))}
                                    classNames={{ checkboxItem: "capitalize" }}
                                />
                            </>
                        )}
                    </div>
                )}

                {/* ─── Table ─── */}
                <div className={cn(tableWrapperVariants({ bordered, stickyHeader }), cns?.tableWrapper)}>
                    <Table$ className={cns?.table}>
                        {caption && <TableCaption>{caption}</TableCaption>}
                        <TableHeader
                            className={cn(tableHeadVariants({ sticky: stickyHeader }), cns?.thead)}
                        >
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className={cns?.headerRow}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            style={{ width: header.column.columnDef.size ? `${header.column.columnDef.size}px` : undefined }}
                                            className={cns?.th}
                                        >
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody className={cns?.tbody}>
                            {loading ? (
                                <SkeletonRows
                                    columns={totalColumns}
                                    rows={skeletonRows}
                                    density={density}
                                    classNames={cns}
                                />
                            ) : table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() ? "selected" : undefined}
                                        className={cn(
                                            tableRowVariants({
                                                density,
                                                striped,
                                                clickable: !!onRowClick,
                                                selected: row.getIsSelected(),
                                            }),
                                            cns?.row,
                                            row.getIsSelected() && cns?.rowSelected
                                        )}
                                        onClick={onRowClick ? (e) => onRowClick(row.original, e) : undefined}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className={cn(cns?.td)}>
                                                <div className={cns?.cell}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className={cns?.emptyRow}>
                                    <TableCell colSpan={totalColumns} className="h-32 p-0">
                                        {emptyState ?? (
                                            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                                No results found.
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table$>
                </div>

                {/* ─── Pagination ─── */}
                {enablePagination && (
                    <div className={cn("flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", cns?.pagination)}>
                        <p className={cn("text-sm text-muted-foreground", cns?.rowCount)}>
                            {enableRowSelection && table.getFilteredSelectedRowModel().rows.length > 0 ? (
                                <>{table.getFilteredSelectedRowModel().rows.length} of{" "}</>
                            ) : null}
                            {table.getFilteredRowModel().rows.length} row(s)
                            {enableRowSelection && table.getFilteredSelectedRowModel().rows.length > 0 ? " selected" : ""}
                        </p>

                        <div className={cn("flex items-center gap-2", cns?.paginationButtons)}>
                            {/* Page size */}
                            <Select
                                value={String(table.getState().pagination.pageSize)}
                                onValueChange={(v) => table.setPageSize(Number(v))}
                                className={cn("w-fit", cns?.pageSizeSelect)}
                                options={pageSizeOptions.map((size) => ({ label: String(size), value: String(size) }))}
                                defaultValue={String(pageSize)}
                                classNames={{ content: 'min-w-auto' }}

                            />

                            <span className={cn("text-sm text-muted-foreground whitespace-nowrap", cns?.pageInfo)}>
                                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </span>

                            <div className="flex items-center gap-1">
                                <Button
                                    variant="outline" size="icon"
                                    className={cn("size-8", cns?.paginationButton)}
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <ChevronsLeft className="size-3.5" />
                                </Button>
                                <Button
                                    variant="outline" size="icon"
                                    className={cn("size-8", cns?.paginationButton)}
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <ChevronLeft className="size-3.5" />
                                </Button>
                                <Button
                                    variant="outline" size="icon"
                                    className={cn("size-8", cns?.paginationButton)}
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <ChevronRight className="size-3.5" />
                                </Button>
                                <Button
                                    variant="outline" size="icon"
                                    className={cn("size-8", cns?.paginationButton)}
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <ChevronsRight className="size-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {footer}
            </CardContent>
        </Card>
    )
}

// ============= RE-EXPORTS =============
export { type ColumnDef } from "@tanstack/react-table"
export type { DataTableProps, DataTableClassNames, RowAction, RowActionItem, RowActionDivider } from "./types"
export { tableRowVariants, tableWrapperVariants, sortableHeaderVariants } from "./variants"

