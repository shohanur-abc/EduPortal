export interface DashboardStatsData {
    studentCount: number
    teacherCount: number
    classCount: number
    activeNotices: number
    feesTotal: number
    feesCollected: number
    attendanceRate: number
}

export interface NoticeRow {
    [key: string]: unknown
    _id: string
    title: string
    authorName: string
    priority: string
    status: string
    publishDate: string
}