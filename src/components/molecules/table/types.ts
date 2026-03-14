import type * as React from "react"
import type { ColumnDef, Table, VisibilityState } from "@tanstack/react-table"
import type { LucideIcon } from "lucide-react"

// ============= CLASS NAMES =============

export interface DataTableClassNames {
    /** Outer card wrapper */
    card?: string
    /** Card header section */
    cardHeader?: string
    /** Card content section */
    cardContent?: string
    /** Toolbar row */
    toolbar?: string
    /** Search input */
    searchInput?: string
    /** Column visibility button */
    columnsButton?: string
    /** Table scroll wrapper */
    tableWrapper?: string
    /** <table> element */
    table?: string
    /** <thead> */
    thead?: string
    /** Header row */
    headerRow?: string
    /** <th> cells */
    th?: string
    /** <tbody> */
    tbody?: string
    /** Body rows */
    row?: string
    /** Selected row state */
    rowSelected?: string
    /** <td> cells */
    td?: string
    /** Cell inner div (supports loading state) */
    cell?: string
    /** Empty state row */
    emptyRow?: string
    /** Pagination wrapper */
    pagination?: string
    /** Row count text */
    rowCount?: string
    /** Page size select trigger */
    pageSizeSelect?: string
    /** Page info text */
    pageInfo?: string
    /** Pagination buttons container */
    paginationButtons?: string
    /** Individual pagination button */
    paginationButton?: string
    /** Skeleton rows */
    skeleton?: string
}

// ============= ROW ACTION =============

export interface RowActionItem<TData> {
    key?: string
    label: string
    icon?: LucideIcon
    disabled?: boolean | ((row: TData) => boolean)
    hidden?: boolean | ((row: TData) => boolean)
    destructive?: boolean
    onClick: (row: TData) => void
}

export type RowActionDivider = { type: "divider"; key?: string }
export type RowAction<TData> = RowActionItem<TData> | RowActionDivider

// ============= MAIN PROPS =============

export interface DataTableProps<TData, TValue = unknown> {
    // --- Data ---
    columns: ColumnDef<TData, TValue>[]
    data: TData[]

    // --- Card header ---
    title?: string
    description?: string

    // --- Search ---
    /** Column id to filter on */
    searchKey?: string
    searchPlaceholder?: string

    // --- Features ---
    /** Enable row selection checkboxes (default: false) */
    enableRowSelection?: boolean
    /** Enable column sorting (default: true) */
    enableSorting?: boolean
    /** Enable column visibility toggle (default: true) */
    enableColumnVisibility?: boolean
    /** Enable pagination (default: true) */
    enablePagination?: boolean
    /** Initial page size */
    pageSize?: number
    /** Page size options */
    pageSizeOptions?: number[]

    // --- Density / appearance ---
    /** Row density variant */
    density?: "compact" | "default" | "comfortable"
    /** Alternate row background */
    striped?: boolean
    /** Stick header on scroll */
    stickyHeader?: boolean
    /** Show a border around the table */
    bordered?: boolean

    // --- State ---
    loading?: boolean
    /** Number of skeleton rows to show when loading */
    skeletonRows?: number
    /** Column visibility state (controlled) */
    columnVisibility?: VisibilityState
    onColumnVisibilityChange?: (state: VisibilityState) => void

    // --- Events ---
    onRowClick?: (row: TData, event: React.MouseEvent) => void
    onRowSelectionChange?: (selectedRows: TData[]) => void

    // --- Row actions ---
    rowActions?: ((row: TData) => RowAction<TData>[]) | RowAction<TData>[]
    rowActionsLabel?: string

    // --- Slots ---
    /** Custom empty state */
    emptyState?: React.ReactNode
    /** Extra toolbar content rendered between search and column button */
    toolbar?: React.ReactNode
    /** Caption rendered below the table */
    caption?: React.ReactNode

    // --- Styling ---
    className?: string
    classNames?: DataTableClassNames

    // --- Advanced ---
    /** Exposes the raw table instance */
    tableRef?: React.Ref<Table<TData>>
    /** Custom footer rendered inside CardContent */
    footer?: React.ReactNode
}
