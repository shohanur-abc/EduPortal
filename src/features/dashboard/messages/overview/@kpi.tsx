import { MetricCard } from "@/components/molecules/metric-card"
import { MessageSquare, Users, MessagesSquare, UserCheck } from "@/lib/icon"
import type { MessageOverviewData } from "./types"

export function MessageKpi({ data, loading }: { data: MessageOverviewData; loading?: boolean }) {
    return (
        <>
            <MetricCard
                title="Total Messages"
                value={data.totalMessages.toLocaleString()}
                subtitle="All messages sent"
                icon={MessageSquare}
                variant="info"
                loading={loading}
            />
            <MetricCard
                title="Conversations"
                value={data.totalConversations}
                subtitle="Active conversations"
                icon={MessagesSquare}
                variant="default"
                loading={loading}
            />
            <MetricCard
                title="Group Chats"
                value={data.activeGroups}
                subtitle="Active group conversations"
                icon={Users}
                variant="success"
                loading={loading}
            />
            <MetricCard
                title="Direct Chats"
                value={data.directChats}
                subtitle="One-on-one conversations"
                icon={UserCheck}
                variant="warning"
                loading={loading}
            />
        </>
    )
}
