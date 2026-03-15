import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsLoading() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="rounded-lg border p-6 space-y-3">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-62.5 w-full rounded" />
                    </div>
                ))}
            </div>
            <div className="rounded-lg border p-6 space-y-3">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-44" />
                <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 py-2">
                            <Skeleton className="size-8 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-16 ml-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
