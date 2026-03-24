import { MessageSquare } from "@/lib/icon"
import { Fee, Message, Notice } from "@/services"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export async function OverviewSidebarSlot() {
    const [recentNotices, messageAnalytics, paymentMethods, monthlyCollection] = await Promise.all([
        Notice.getRecent(8),
        Message.getAnalytics(),
        Fee.paymentMethodBreakdown(),
        Fee.monthlyCollection(),
    ])

    const agendaItems = recentNotices.slice(0, 4)
    const senderItems = messageAnalytics.topSenders.slice(0, 4)
    const monthlyAverage = monthlyCollection.length > 0
        ? Math.round(monthlyCollection.reduce((sum, item) => sum + item.total, 0) / monthlyCollection.length)
        : 0
    const totalPaymentRecords = paymentMethods.reduce((sum, item) => sum + item.count, 0)

    return (
        <div className="space-y-4">
            <Card className="p-0">
                <CardContent className="p-3">
                    <Calendar mode="single" className="w-full rounded-md" />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Agenda</CardTitle>
                    <CardDescription>Upcoming notice timeline</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {agendaItems.map((item) => (
                        <div key={item._id} className="rounded-md border p-3">
                            <p className="text-sm font-medium leading-snug">{item.title}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{item.publishDate}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>Top active senders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {senderItems.map((item) => (
                        <div key={item._id} className="flex items-center justify-between gap-2">
                            <AvatarCell name={item.name} secondary={item.role} image={item.image} className="gap-2" />
                            <Badge variant="secondary" className="gap-1">
                                <MessageSquare className="size-3" />
                                {item.count}
                            </Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Finance Snapshot</CardTitle>
                    <CardDescription>Collection summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Monthly Avg</span>
                        <span>৳{monthlyAverage.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Payment Methods</span>
                        <span>{paymentMethods.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Total Records</span>
                        <span>{totalPaymentRecords.toLocaleString()}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
