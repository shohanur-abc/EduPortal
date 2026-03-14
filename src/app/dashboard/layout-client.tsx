"use client"

import { LayoutDashboard, CheckCircle2, BarChart3, FileText, DollarSign, Settings, Bell, Users, Shield, Lock, GraduationCap, UserCog, School, MessageSquare, Link, } from "@/lib/icon"
import { Separator } from "@/components/ui/separator"
import { SidebarLayout, SidebarBrand, SidebarUser, SidebarTrigger, type SidebarNavItem, } from "@/components/molecules/sidebar"
import { ROUTES } from "@/lib/routes"
import NotificationMenu from "@/features/navigation/notification-menu"
import UserMenu from "@/features/navigation/user-menu"
import { usePathname } from "next/navigation"

// ─── NAV DEFINITION ───────────────────────────────────────────────────────────

const DASHBOARD_NAV: SidebarNavItem[] = [
    {
        type: "group",
        label: "Dashboard",
        items: [
            { label: "Overview", href: ROUTES.dashboard.overview, icon: LayoutDashboard },
        ],
    },
    {
        type: "group",
        label: "Academic",
        items: [
            {
                label: "Attendance",
                href: ROUTES.dashboard.attendance.overview,
                icon: CheckCircle2,
            },
            {
                label: "Results",
                href: ROUTES.dashboard.results.overview,
                icon: BarChart3,
            },
            {
                label: "Reports",
                icon: FileText,
                href: ROUTES.dashboard.reports.overview,
            },
        ],
    },
    {
        type: "group",
        label: "Finance",
        items: [
            {
                label: "Fees",
                icon: DollarSign,
                href: ROUTES.dashboard.fees.overview,
            },
        ],
    },
    {
        type: "group",
        label: "Operations",
        items: [
            {
                label: "Operations",
                icon: Settings,
                href: ROUTES.dashboard.operations.overview,
            },
            {
                label: "Notices",
                icon: Bell,
                href: ROUTES.dashboard.notices.overview,
            },
            {
                label: "Messages",
                icon: MessageSquare,
                href: ROUTES.dashboard.messages.overview,
            },
        ],
    },
    {
        type: "group",
        label: "Administration",
        items: [
            {
                label: "Users",
                icon: Users,
                href: ROUTES.dashboard.users.overview,
            },
            {
                label: "Roles",
                icon: Shield,
                href: ROUTES.dashboard.roles.overview,
            },
        ],
    },
    {
        type: "group",
        label: "Portals",
        items: [
            { label: "Admin", href: ROUTES.dashboard.admin, icon: Lock },
            { label: "Teacher", href: ROUTES.dashboard.teacher, icon: School },
            { label: "Student", href: ROUTES.dashboard.student, icon: GraduationCap },
            { label: "Parent", href: ROUTES.dashboard.parent, icon: Users },
            { label: "Principal", href: ROUTES.dashboard.principal, icon: UserCog },
        ],
    },
]

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────

const NOTIFICATIONS = [
    {
        id: "1",
        title: "New attendance mark",
        description: "Class A submitted attendance",
        time: "5 minutes ago",
        read: false,
        href: ROUTES.dashboard.attendance.reports,
    },
    {
        id: "2",
        title: "Fee payment received",
        description: "Payment from student ID 001",
        time: "1 hour ago",
        read: true,
        href: ROUTES.dashboard.fees.tracking,
    },
]

// ─── PROPS ────────────────────────────────────────────────────────────────────

interface DashboardLayoutClientProps {
    user: {
        name: string
        email: string
        role: string
        avatar?: string
    }
    children: React.ReactNode
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export function DashboardLayoutClient({ user, children }: DashboardLayoutClientProps) {
    const pathname = usePathname()
    const activeNavItem = pathname.split("/")[2]
    console.log("Current path:", typeof pathname)
    return (
        <SidebarLayout
            nav={DASHBOARD_NAV}
            header={
                <SidebarBrand
                    logo={GraduationCap}
                    name="EduPortal "
                    subtitle={user.role}
                    href={ROUTES.marketing.home}
                />
            }
            collapsible="icon"
            rail
            persistScrollKey="dashboard-sidebar-scroll"
            topbar={
                <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b h-12 shrink-0">
                    <div className="flex h-14 w-full items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-12!" />
                        <h1 className="font-semibold text-sm capitalize">{activeNavItem}</h1>
                        <div className="ml-auto flex items-center gap-4">
                            <NotificationMenu notifications={NOTIFICATIONS} unreadCount={1} />
                            <UserMenu user={user} />
                        </div>
                    </div>
                </header>
            }
        >
            <main className="@container px-4 py-2 @md:px-6 @md:py-3">{children}</main>
        </SidebarLayout>
    )
}
