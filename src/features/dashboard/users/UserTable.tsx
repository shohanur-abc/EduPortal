"use client"

import * as React from "react"
import { PaginationMolecule } from "@/components/molecules/pagination"
import { EmptyState } from "@/components/molecules/empty-state"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/molecules"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "@/lib/icon"
import { getColumnsByRole } from "./columns"
import { AddUserSheet } from "./add-user-sheet"
import { cn } from "@/lib/utils"
import {
    ColumnDef,
    PaginationState,
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    type OnChangeFn,
    type Updater,
} from "@tanstack/react-table"
import {
    parseAsInteger,
    parseAsString,
    parseAsStringLiteral,
    useQueryStates,
} from "nuqs"
import type { AnyUser, UserRole } from "./types"
import { Shield, School, Backpack, Users, GraduationCap } from "lucide-react"

interface UserTableProps {
    columns?: ColumnDef<AnyUser>[]
    data: AnyUser[]
    total: number
    pageCount: number
    defaultRole: UserRole
    roleCounts: Record<UserRole, number>
    classOptions: Array<{ value: string; label: string }>
}

const ROLES = ["admin", "principal", "teacher", "student", "parent"] as const

const ROLE_TABS: Array<{ role: UserRole; label: string; icon: React.ReactNode }> = [
    { role: "admin", label: "Admin", icon: <Shield /> },
    { role: "principal", label: "Principal", icon: <School /> },
    { role: "teacher", label: "Teacher", icon: <GraduationCap /> },
    { role: "student", label: "Student", icon: <Backpack /> },
    { role: "parent", label: "Parent", icon: <Users /> },
]

export function UserTable({ data, total, pageCount, defaultRole, roleCounts, classOptions }: UserTableProps) {
    const [isPending, startTransition] = React.useTransition()
    const [query, setQuery] = useQueryStates({
        role: parseAsStringLiteral(ROLES).withDefault(defaultRole || "teacher"),
        search: parseAsString.withDefault(""),
        page: parseAsInteger.withDefault(1),
        pageSize: parseAsInteger.withDefault(10),
        sort: parseAsString.withDefault("name"),
        order: parseAsStringLiteral(["asc", "desc"] as const).withDefault("asc"),
    }, { shallow: false })

    const handleQueryChange = React.useCallback((updates: Partial<typeof query>) => {
        startTransition(() => {
            setQuery(updates)
        })
    }, [setQuery])

    const searchTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    const columns = React.useMemo(() => getColumnsByRole[query.role], [query.role])
    const sorting = React.useMemo<SortingState>(() => [{ id: query.sort, desc: query.order === "desc" }], [query.order, query.sort])
    const pagination = React.useMemo<PaginationState>(() => ({ pageIndex: Math.max(query.page - 1, 0), pageSize: query.pageSize }), [query.page, query.pageSize])

    const onSortingChange = React.useCallback<OnChangeFn<SortingState>>((updater: Updater<SortingState>) => {
        const next = typeof updater === "function" ? updater(sorting) : updater
        const nextValue = next[0]

        if (!nextValue) {
            handleQueryChange({ sort: "name", order: "asc", page: 1 })
            return
        }

        handleQueryChange({
            sort: nextValue.id,
            order: nextValue.desc ? "desc" : "asc",
            page: 1,
        })
    }, [handleQueryChange, sorting])

    const table = useReactTable({
        data,
        columns,
        state: { sorting, pagination },
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
        rowCount: total,
        pageCount,
        onSortingChange,
    })

    const handleSearch = React.useCallback((value: string) => {
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
        searchTimeoutRef.current = setTimeout(() => {
            handleQueryChange({ search: value, page: 1 })
        }, 300)
    }, [handleQueryChange])

    React.useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
        }
    }, [])

    return (
        <div className="space-y-4">
            <Tabs value={query.role} onValueChange={(value) => {
                handleQueryChange({ role: value as UserRole, page: 1 })
            }}>
                <TabsList className="h-auto flex-wrap">
                    {ROLE_TABS.map(({ role, label, icon }) => (
                        <TabsTrigger key={role} value={role} className="gap-2">
                            <span>{icon}</span>
                            <span>{label}</span>
                            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                {roleCounts[role] || 0}
                            </span>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            <div className="rounded-lg border p-3">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="relative w-full max-w-sm">
                        <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
                        <Input
                            defaultValue={query.search}
                            onChange={(event) => handleSearch(event.target.value)}
                            placeholder="Search by name, email or ID..."
                            className="pl-9"
                        />
                    </div>
                    <AddUserSheet defaultRole={query.role} classOptions={classOptions} />
                </div>

                {data.length === 0 ? (
                    <EmptyState title="No users found" description="Try changing filters, search, or role selection." />
                ) : (
                    <div className="overflow-auto rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {isPending
                                    ? Array.from({ length: query.pageSize }).map((_, idx) => (
                                        <TableRow key={`skeleton-${idx}`}>
                                            {columns.map((col) => (
                                                <TableCell key={col.id}>
                                                    <Skeleton className="h-6 w-full" />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                    : table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} className={cn("hover:bg-muted/30")}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-muted-foreground text-sm">
                        {total} users • page {query.page} of {Math.max(pageCount, 1)}
                    </span>

                    <PaginationMolecule
                        currentPage={query.page}
                        totalPages={Math.max(pageCount, 1)}
                        onPageChange={(nextPage) => {
                            handleQueryChange({ page: nextPage })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
