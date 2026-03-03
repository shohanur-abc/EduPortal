import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// ============= COMPONENT =============
export function MiniTable({ title, description, headers, rows, className, classNames, loading }: MiniTableProps) {
    return (
        <Card className={cn("@container/card", className)}>
            {(title || description) && (
                <CardHeader className={classNames?.header}>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
            )}
            <CardContent className="px-3">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                {headers.map((h, i) => (
                                    <th key={i} className={cn("px-3 py-2 text-left font-medium text-muted-foreground", i > 0 && "text-right", classNames?.th)}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.id} className="border-b last:border-0">
                                    {row.cells.map((cell, ci) => (
                                        <td key={ci} className={cn("px-3 py-2", ci > 0 && "text-right tabular-nums", classNames?.td)} data-loading={loading}>
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan={headers.length} className="py-6 text-center text-muted-foreground">
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}

// ============= TYPES =============
interface MiniTableRow {
    id: string
    cells: React.ReactNode[]
}

interface MiniTableProps {
    title?: string
    description?: string
    headers: string[]
    rows: MiniTableRow[]
    className?: string
    classNames?: { header?: string; th?: string; td?: string }
    loading?: boolean
}
