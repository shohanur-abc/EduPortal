export interface NoticeItem {
    [key: string]: unknown
    _id: string
    title: string
    content: string
    authorName: string
    priority: string
    targetAudience: string[]
    publishDate: string
    expiryDate: string
    status: string
}

export interface NoticeStatusCount {
    status: string
    count: number
}

export interface NoticePriorityCount {
    priority: string
    count: number
}

export interface NoticeAudienceCount {
    audience: string
    count: number
}

export interface NoticePublishTrend {
    month: string
    count: number
    published: number
}

export interface NoticeExpiringItem {
    _id: string
    title: string
    authorName: string
    priority: string
    expiryDate: string
}
