"use client";
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import DashboardSidebar from '@/features/navigation/dashboard-sidebar';
import NotificationMenu from '@/features/navigation/notification-menu';
import UserMenu from '@/features/navigation/user-menu';
import { ROUTES } from '@/lib/routes';
import React from 'react';
import { LayoutDashboard, CheckCircle2, BarChart3, FileText, DollarSign, Settings, Bell, Users, Shield, Lock } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardSidebar sidebarItems={DASHBOARD_MENU} userRole="admin">
            <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b h-14 shrink-0">
                <div className="flex h-14 w-full items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-6" />
                    <h1 className="font-semibold text-sm">Dashboard</h1>
                    <div className="ml-auto flex items-center gap-4">
                        <NotificationMenu notifications={notifications} unreadCount={1} />
                        <UserMenu user={user} />
                    </div>
                </div>
            </header>
            <main className='p-4'>{children}</main>
        </DashboardSidebar>
    );
}


export const DASHBOARD_MENU = [
    {
        label: "Dashboard",
        items: [
            {
                label: "Overview",
                href: ROUTES.dashboard.home,
                icon: <LayoutDashboard/>,
            },
        ],
    },
    {
        label: "Academic",
        items: [
            {
                label: "Attendance",
                href: ROUTES.dashboard.attendance.root,
                icon: <CheckCircle2/>,
            },
            {
                label: "Results",
                href: ROUTES.dashboard.results.root,
                icon: <BarChart3/>,
            },
            {
                label: "Reports",
                href: ROUTES.dashboard.reports.root,
                icon: <FileText/>,
            },
        ],
    },
    {
        label: "Finance",
        items: [
            {
                label: "Fees",
                href: ROUTES.dashboard.fees.root,
                icon: <DollarSign/>,
            },
        ],
    },
    {
        label: "Operations",
        items: [
            {
                label: "Operations",
                href: ROUTES.dashboard.operations.root,
                icon: <Settings/>,
            },
            {
                label: "Notices",
                href: ROUTES.dashboard.notices.root,
                icon: <Bell/>,
            },
        ],
    },
    {
        label: "Administration",
        items: [
            {
                label: "Users",
                href: ROUTES.dashboard.users.root,
                icon: <Users/>,
            },
            {
                label: "Roles",
                href: ROUTES.dashboard.roles.root,
                icon: <Shield/>,
            },
            {
                label: "Admin",
                href: ROUTES.dashboard.admin,
                icon: <Lock/>,
            },
        ],
    },
];

const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    avatar: 'https://github.com/shadcn.png',
};

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



