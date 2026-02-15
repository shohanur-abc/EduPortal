'use client';

import { Separator } from '@/components/ui/separator';
import UserMenu from './user-menu';
import NotificationMenu from './notification-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';

// ============= MAIN COMPONENT =============
export default function DashboardHeader() {
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
            href: '/dashboard/attendance/reports',
        },
        {
            id: '2',
            title: 'Fee payment received',
            description: 'Payment from student ID 001',
            time: '1 hour ago',
            read: true,
            href: '/dashboard/fees/tracking',
        },
    ];

    return (
        <SiteHeader user={user} notifications={notifications} unreadCount={1} />
    );
}

// ============= CHILD COMPONENTS =============
interface ISiteHeader {
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
  notifications: {
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
    href: string;
  }[];
  unreadCount: number;
}

const SiteHeader = ({ user, notifications, unreadCount }: ISiteHeader) => (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b h-16 shrink-0">
        <div className="flex h-16 w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-6" />
            <h1 className="font-semibold text-sm">Dashboard</h1>
            <div className="ml-auto flex items-center gap-2">
                <NotificationMenu notifications={notifications} unreadCount={unreadCount} />
                <UserMenu user={user} />
            </div>
        </div>
    </header>
);
