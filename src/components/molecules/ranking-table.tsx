import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

// ============= COMPONENT =============
export function RankingTable<T extends Record<string, unknown>>({
    title, description, columns, data, keyExtractor, className, classNames, loading, showRank = true,
}: RankingTableProps<T>) {
    return (
        <Card className={cn("@container/card", className)}>
            {(title || description) && (
                <CardHeader className={classNames?.header}>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
            )}
            <CardContent className="px-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {showRank && <TableHead className="w-10">#</TableHead>}
                            {columns.map((col) => (
                                <TableHead key={String(col.key)} className={col.className}>{col.header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row, i) => (
                            <TableRow key={keyExtractor ? keyExtractor(row) : i}>
                                {showRank && (
                                    <TableCell className="font-medium tabular-nums text-muted-foreground" data-loading={loading}>
                                        {i + 1}
                                    </TableCell>
                                )}
                                {columns.map((col) => (
                                    <TableCell key={String(col.key)} className={col.cellClassName}>
                                        <div data-loading={loading}>
                                            {col.render ? col.render(row, i) : String(row[col.key] ?? "")}
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length + (showRank ? 1 : 0)} className="h-24 text-center text-muted-foreground">
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

// ============= TYPES =============
interface RankColumn<T> {
    key: keyof T | string
    header: string
    className?: string
    cellClassName?: string
    render?: (row: T, index: number) => React.ReactNode
}

interface RankingTableProps<T extends Record<string, unknown>> {
    title?: string
    description?: string
    columns: RankColumn<T>[]
    data: T[]
    keyExtractor?: (row: T) => string
    className?: string
    classNames?: { header?: string }
    loading?: boolean
    showRank?: boolean
}
