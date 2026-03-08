import type { Metadata } from "next"
import { auth } from '@/lib/auth';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import DashboardSidebar from '@/features/navigation/dashboard-sidebar';
import NotificationMenu from '@/features/navigation/notification-menu';
import UserMenu from '@/features/navigation/user-menu';
import { ROUTES } from '@/lib/routes';
import { LayoutDashboard, CheckCircle2, BarChart3, FileText, DollarSign, Settings, Bell, Users, Shield, Lock, GraduationCap, UserCog, School, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
    title: {
        default: "Dashboard | EduPortal",
        template: "%s | EduPortal",
    },
    description: "EduPortal dashboard for managing your institution",
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()

    const user = session?.user ? {
        name: session.user.name || 'User',
        email: session.user.email || '',
        role: session.user.role || 'user',
        avatar: session.user.image,
    } : null

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Not Authenticated</h1>
                    <p className="text-muted-foreground">Please log in to continue</p>
                </div>
            </div>
        )
    }
    return (
        <DashboardSidebar sidebarItems={DASHBOARD_MENU} userRole={user.role}>
            <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b h-14 shrink-0">
                <div className="flex h-14 w-full items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-6" />
                    <h1 className="font-semibold text-sm">EduPortal</h1>
                    <div className="ml-auto flex items-center gap-4">
                        <NotificationMenu notifications={notifications} unreadCount={1} />
                        <UserMenu user={user} />
                    </div>
                </div>
            </header>
            <main className="@container/main p-4 md:p-6">{children}</main>
        </DashboardSidebar>
    );
}


export const DASHBOARD_MENU = [
    {
        label: "Dashboard",
        items: [
            {
                label: "Overview",
                href: ROUTES.dashboard.overview,
                icon: <LayoutDashboard />,
            },
        ],
    },
    {
        label: "Academic",
        items: [
            {
                label: "Attendance",
                href: ROUTES.dashboard.attendance.overview,
                icon: <CheckCircle2 />,
            },
            {
                label: "Results",
                href: ROUTES.dashboard.results.overview,
                icon: <BarChart3 />,
            },
            {
                label: "Reports",
                href: ROUTES.dashboard.reports.overview,
                icon: <FileText />,
            },
        ],
    },
    {
        label: "Finance",
        items: [
            {
                label: "Fees",
                href: ROUTES.dashboard.fees.overview,
                icon: <DollarSign />,
            },
        ],
    },
    {
        label: "Operations",
        items: [
            {
                label: "Operations",
                href: ROUTES.dashboard.operations.overview,
                icon: <Settings />,
            },
            {
                label: "Notices",
                href: ROUTES.dashboard.notices.overview,
                icon: <Bell />,
            },
            {
                label: "Messages",
                href: ROUTES.dashboard.messages.chat,
                icon: <MessageSquare />,
            },
        ],
    },
    {
        label: "Administration",
        items: [
            {
                label: "Users",
                href: ROUTES.dashboard.users.overview,
                icon: <Users />,
            },
            {
                label: "Roles",
                href: ROUTES.dashboard.roles.overview,
                icon: <Shield />,
            },
        ],
    },
    {
        label: "Portals",
        items: [
            {
                label: "Admin",
                href: ROUTES.dashboard.admin,
                icon: <Lock />,
            },
            {
                label: "Teacher",
                href: ROUTES.dashboard.teacher,
                icon: <School />,
            },
            {
                label: "Student",
                href: ROUTES.dashboard.student,
                icon: <GraduationCap />,
            },
            {
                label: "Parent",
                href: ROUTES.dashboard.parent,
                icon: <Users />,
            },
            {
                label: "Principal",
                href: ROUTES.dashboard.principal,
                icon: <UserCog />,
            },
        ],
    },
];

const notifications = [
    {
        id: '1',
        title: 'New attendance mark',
        description: 'Class A submitted attendance',
        time: '5 minutes ago',
        read: false,
        href: ROUTES.dashboard.attendance.reports,
    },
    {
        id: '2',
        title: 'Fee payment received',
        description: 'Payment from student ID 001',
        time: '1 hour ago',
        read: true,
        href: ROUTES.dashboard.fees.tracking,
    },
];



