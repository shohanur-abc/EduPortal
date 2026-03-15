import { Skeleton } from "@/components/ui/skeleton"

export default function ChatLoading() {
    return (
        <div className="flex h-[calc(100vh-12rem)] rounded-lg border bg-background overflow-hidden">
            {/* Sidebar skeleton */}
            <div className="w-80 shrink-0 border-r p-3 space-y-3">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="size-8 rounded-md" />
                </div>
                <Skeleton className="h-9 w-full rounded-md" />
                <div className="space-y-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-2">
                            <Skeleton className="size-10 rounded-full shrink-0" />
                            <div className="flex-1 space-y-1.5">
                                <Skeleton className="h-3.5 w-28" />
                                <Skeleton className="h-3 w-40" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Chat area skeleton */}
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-3">
                    <Skeleton className="size-12 rounded-full mx-auto" />
                    <Skeleton className="h-5 w-40 mx-auto" />
                    <Skeleton className="h-4 w-56 mx-auto" />
                </div>
            </div>
        </div>
    )
}
