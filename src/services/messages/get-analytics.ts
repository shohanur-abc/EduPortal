"use server"

import { db } from "@/fatman"


export async function getAnalytics(): Promise<MessageAnalytics> {
    await db.connect()

    const [messageTrend, topSenders, dailyActivity, participantStats, conversationTrend] =
        await Promise.all([
            db.message.messageTrend(6),
            db.message.topSenders(10),
            db.message.dailyActivity(30),
            db.conversation.participantStats(),
            db.conversation.activityTrend(6),
        ])

    return {
        messageTrend: messageTrend.map((t: { _id: { month: number; year: number }; count: number }) => ({
            month: t._id.month,
            year: t._id.year,
            count: t.count,
        })),
        topSenders: topSenders.map((s: { _id: unknown; name: string; role: string; image: string | null; count: number }) => ({
            _id: String(s._id),
            name: s.name,
            role: s.role,
            image: s.image ?? null,
            count: s.count,
        })),
        dailyActivity: dailyActivity.map((a: { _id: { hour: number }; count: number }) => ({
            hour: a._id.hour,
            count: a.count,
        })),
        participantStats: participantStats.map((s: { _id: string; avgParticipants: number; maxParticipants: number; total: number }) => ({
            type: s._id,
            avgParticipants: Math.round(s.avgParticipants * 10) / 10,
            maxParticipants: s.maxParticipants,
            total: s.total,
        })),
        conversationTrend: conversationTrend.map((t: { _id: { month: number; year: number }; count: number }) => ({
            month: t._id.month,
            year: t._id.year,
            count: t.count,
        })),
    }
}


export interface MessageAnalytics {
    messageTrend: { month: number; year: number; count: number }[]
    topSenders: { _id: string; name: string; role: string; image: string | null; count: number }[]
    dailyActivity: { hour: number; count: number }[]
    participantStats: { type: string; avgParticipants: number; maxParticipants: number; total: number }[]
    conversationTrend: { month: number; year: number; count: number }[]
}
