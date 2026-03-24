import { Notice, Result } from "@/services"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/molecules/status-badge"

export async function OverviewActivitySlot() {
    const [recentNotices, subjectPerformance] = await Promise.all([
        Notice.getRecent(8),
        Result.getSubjectWisePerformance(),
    ])

    const subjectData = subjectPerformance
        .slice()
        .sort((a, b) => b.passRate - a.passRate)
        .slice(0, 6)

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest school notices</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentNotices.slice(0, 6).map((item) => (
                        <div key={item._id} className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-medium leading-snug">{item.title}</p>
                                <StatusBadge status={item.priority as "low" | "medium" | "high" | "urgent"} />
                            </div>
                            <p className="text-xs text-muted-foreground">{item.publishDate}</p>
                            <Separator />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="lg:col-span-8">
                <CardHeader>
                    <CardTitle>Grade by Subject</CardTitle>
                    <CardDescription>Pass-rate trend across subjects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    {subjectData.map((item) => (
                        <div key={item.subject} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{item.subject}</span>
                                <span className="text-sm text-muted-foreground">{item.passRate}%</span>
                            </div>
                            <Progress value={item.passRate} />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
