import { auth } from "@/lib/auth"
import { Dashboard, Fee, Message } from "@/services"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { StatCard } from "@/components/molecules/stat-card"
import { CalendarDays, CheckCircle2, ClipboardList, Trophy } from "@/lib/icon"

export async function OverviewHeroSlot() {
    const [session, stats, feeTotals, messageOverview] = await Promise.all([
        auth(),
        Dashboard.stats(),
        Fee.feeTotals(),
        Message.getOverview(),
    ])

    const userName = session?.user?.name ?? "User"
    const userEmail = session?.user?.email ?? ""
    const userImage = session?.user?.image ?? undefined
    const completionRate = feeTotals.total > 0 ? Math.round((feeTotals.collected / feeTotals.total) * 100) : 0

    return (
        <div className="grid grid-cols-1 gap-4 @3xl:grid-cols-12">
            <Card className="lg:col-span-6">
                <CardContent className="flex @3xl:flex-col @3xl:text-center @3xl:justify-center items-center gap-4">
                    <Avatar className="size-16 border">
                        <AvatarImage src={userImage} alt={userName} />
                        <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 @3xl:px-10">
                        <h2 className="text-lg font-semibold">Welcome, {userName}</h2>
                        <p className="text-sm text-muted-foreground">Overview of attendance, academic progress, and communication activity.</p>
                        <p className="text-xs text-muted-foreground">{userEmail}</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4 @3xl:col-span-6">
                <StatCard title="Attendance" value={`${stats.attendanceRate}%`} icon={CheckCircle2} variant="success" footer="Today" />
                <StatCard title="Tasks Completed" value={completionRate} icon={ClipboardList} footer="Fee collection rate" />
                <StatCard title="Task In Progress" value={stats.activeNotices} icon={CalendarDays} footer="Active notices" />
                <StatCard title="Reward Points" value={messageOverview.totalMessages} icon={Trophy} footer="Messages sent" />
            </div>
        </div>
    )
}
