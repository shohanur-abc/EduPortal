// import { EmptyState } from "@/components/molecules/empty-state"
// import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { NoticesCrudTable } from "@/features/dashboard/notices/manage/notice-crud"
// import { AlertTriangle, FileText } from "lucide-react"


// // ============= MANAGE SECTION =============
// export function NoticesManageSection({ notices, loading }: { notices: NoticeRow[], loading?: boolean }) {
//     if (notices.length === 0 && !loading) {
//         return (
//             <EmptyState
//                 title="No Notices Found"
//                 description="There are no notices to manage yet. Create a new notice to get started."
//                 icon={FileText}
//             />
//         )
//     }

//     const expiredCount = notices.filter((n) => isExpired(n.expiryDate) && n.status === "published").length

//     return (
//         <div className="space-y-6">
//             {expiredCount > 0 && (
//                 <Card className="border-amber-200 dark:border-amber-900">
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2 text-base text-amber-700 dark:text-amber-400">
//                             <AlertTriangle className="size-4" />
//                             {expiredCount} Notice{expiredCount > 1 ? "s" : ""} Past Expiry
//                         </CardTitle>
//                         <CardDescription>
//                             These notices have passed their expiry date but are still published. Consider archiving them.
//                         </CardDescription>
//                     </CardHeader>
//                 </Card>
//             )}

//             <NoticesCrudTable notices={notices} />
//         </div>
//     )
// }

// // ============= TYPES =============
// interface NoticeRow {
//     [key: string]: unknown
//     _id: string
//     title: string
//     content: string
//     authorName: string
//     priority: string
//     targetAudience: string[]
//     publishDate: string
//     expiryDate: string
//     status: string
// }

// // ============= HELPERS =============
// function isExpired(expiryDate: string) {
//     if (!expiryDate) return false
//     return new Date(expiryDate) < new Date()
// }
