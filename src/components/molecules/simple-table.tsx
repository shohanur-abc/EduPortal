import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// ============= COMPONENT =============
export function SimpleTable<T extends Record<string, unknown>>({
    title,
    description,
    columns,
    data,
    className,
    emptyMessage = "No data found",
    keyExtractor,
    loading = false,
}: DataTableProps<T>) {
    return (
        <Card className={cn(className)} >
            {(title || description) && (
                <CardHeader>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
            )}
            <CardContent className="px-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col) => (
                                <TableHead key={String(col.key)} className={col.className}>
                                    {col.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, i) => (
                                <TableRow key={keyExtractor ? keyExtractor(row) : i}>
                                    {columns.map((col) => (
                                        <TableCell key={String(col.key)} className={cn(col.cellClassName)}>
                                            <div data-loading={loading}>{col.render ? col.render(row) : String(row[col.key] ?? "")}</div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

// ============= TYPES =============
interface Column<T> {
    key: keyof T | string
    header: string
    className?: string
    cellClassName?: string
    render?: (row: T) => React.ReactNode
}

interface DataTableProps<T extends Record<string, unknown>> {
    title?: string
    description?: string
    columns: Column<T>[]
    data: T[]
    className?: string
    emptyMessage?: string
    keyExtractor?: (row: T) => string
    loading?: boolean
}
