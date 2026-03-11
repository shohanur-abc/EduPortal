"use client"

import { LayoutDashboard, CheckCircle2, BarChart3, FileText, DollarSign, Settings, Bell, Users, Shield, Lock, GraduationCap, UserCog, School, MessageSquare, } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { SidebarLayout, SidebarBrand, SidebarUser, SidebarTrigger, type SidebarNavItem, } from "@/components/molecules/sidebar"
import { ROUTES } from "@/lib/routes"
import NotificationMenu from "@/features/navigation/notification-menu"
import UserMenu from "@/features/navigation/user-menu"

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
                type: "collapsible",
                label: "Attendance",
                icon: CheckCircle2,
                items: [
                    { label: "Overview", href: ROUTES.dashboard.attendance.overview },
                    { label: "Mark Attendance", href: ROUTES.dashboard.attendance.mark },
                    { label: "Corrections", href: ROUTES.dashboard.attendance.corrections },
                    { label: "Reports", href: ROUTES.dashboard.attendance.reports },
                ],
            },
            {
                type: "collapsible",
                label: "Results",
                icon: BarChart3,
                items: [
                    { label: "Overview", href: ROUTES.dashboard.results.overview },
                    { label: "Enter Results", href: ROUTES.dashboard.results.enter },
                    { label: "View Results", href: ROUTES.dashboard.results.view },
                    { label: "Report Cards", href: ROUTES.dashboard.results.reportCards },
                    { label: "Analytics", href: ROUTES.dashboard.results.analytics },
                ],
            },
            {
                type: "collapsible",
                label: "Reports",
                icon: FileText,
                items: [
                    { label: "Overview", href: ROUTES.dashboard.reports.overview },
                    { label: "Standard", href: ROUTES.dashboard.reports.standard },
                    { label: "Custom", href: ROUTES.dashboard.reports.custom },
                    { label: "Analytics", href: ROUTES.dashboard.reports.analytics },
                ],
            },
        ],
    },
    {
        type: "group",
        label: "Finance",
        items: [
            {
                type: "collapsible",
                label: "Fees",
                icon: DollarSign,
                items: [
                    { label: "Overview", href: ROUTES.dashboard.fees.overview },
                    { label: "Collection", href: ROUTES.dashboard.fees.collection },
                    { label: "Tracking", href: ROUTES.dashboard.fees.tracking },
                    { label: "Statements", href: ROUTES.dashboard.fees.statements },
                    { label: "Structure", href: ROUTES.dashboard.fees.structure },
                ],
            },
        ],
    },
    {
        type: "group",
        label: "Operations",
        items: [
            {
                type: "collapsible",
                label: "Operations",
                icon: Settings,
                items: [
                    { label: "Overview", href: ROUTES.dashboard.operations.overview },
                    { label: "Calendar", href: ROUTES.dashboard.operations.calendar },
                    { label: "Classes", href: ROUTES.dashboard.operations.classes },
                    { label: "Staff", href: ROUTES.dashboard.operations.staff },
                    { label: "Students", href: ROUTES.dashboard.operations.students },
                    { label: "Settings", href: ROUTES.dashboard.operations.settings },
                ],
            },
            {
                type: "collapsible",
                label: "Notices",
                icon: Bell,
                items: [
                    { label: "Overview", href: ROUTES.dashboard.notices.overview },
                    { label: "Create", href: ROUTES.dashboard.notices.create },
                    { label: "Manage", href: ROUTES.dashboard.notices.manage },
                ],
            },
            {
                type: "collapsible",
                label: "Messages",
                icon: MessageSquare,
                items: [
                    { label: "Chat", href: ROUTES.dashboard.messages.chat },
                    { label: "Overview", href: ROUTES.dashboard.messages.overview },
                    { label: "Analytics", href: ROUTES.dashboard.messages.analytics },
                ],
            },
        ],
    },
    {
        type: "group",
        label: "Administration",
        items: [
            {
                type: "collapsible",
                label: "Users",
                icon: Users,
                items: [
                    { label: "Overview", href: ROUTES.dashboard.users.overview },
                    { label: "Credentials", href: ROUTES.dashboard.users.credentials },
                    { label: "Activity", href: ROUTES.dashboard.users.activity },
                ],
            },
            {
                type: "collapsible",
                label: "Roles",
                icon: Shield,
                items: [
                    { label: "Overview", href: ROUTES.dashboard.roles.overview },
                    { label: "Manage", href: ROUTES.dashboard.roles.manage },
                    { label: "Permissions", href: ROUTES.dashboard.roles.permissions },
                    { label: "Users", href: ROUTES.dashboard.roles.users },
                ],
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
    return (
        <SidebarLayout
            nav={DASHBOARD_NAV}
            header={
                <SidebarBrand
                    logo={GraduationCap}
                    name="EduPortal"
                    subtitle={user.role}
                    href={ROUTES.marketing.home}
                />
            }
            footer={
                <SidebarUser
                    name={user.name}
                    email={user.email}
                    avatar={user.avatar}
                    avatarFallback={user.name.slice(0, 2).toUpperCase()}
                />
            }
            collapsible="icon"
            rail
            persistScrollKey="dashboard-sidebar-scroll"
            topbar={
                <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b h-14 shrink-0">
                    <div className="flex h-14 w-full items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-6" />
                        <h1 className="font-semibold text-sm">EduPortal</h1>
                        <div className="ml-auto flex items-center gap-4">
                            <NotificationMenu notifications={NOTIFICATIONS} unreadCount={1} />
                            <UserMenu user={user} />
                        </div>
                    </div>
                </header>
            }
        >
            <main className="@container/main p-4 md:p-6">{children}</main>
        </SidebarLayout>
    )
}
