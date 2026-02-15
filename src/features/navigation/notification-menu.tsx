'use client';

import { Bell } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

// ============= MAIN COMPONENT =============
export default function NotificationMenu({ notifications, unreadCount }: INotificationMenu) {
    const hasNotifications = notifications.length > 0;

    return (
        <DropdownMenu>
            <NotificationTrigger unreadCount={unreadCount} />
            <DropdownMenuContent align="end" className="w-72 p-0">
                <NotificationHeader unreadCount={unreadCount} hasNotifications={hasNotifications} />
                <NotificationContent notifications={notifications} hasNotifications={hasNotifications} />
                {hasNotifications && <NotificationFooter />}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// ============= CHILD COMPONENTS =============
const NotificationTrigger = ({ unreadCount }: { unreadCount: number }) => (
    <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-5" />
            {unreadCount > 0 && (
                <Badge
                    variant="destructive"
                    className="absolute -right-0.5 -top-0.5 size-5 flex items-center justify-center p-0 text-xs rounded-full"
                >
                    {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
            )}
        </Button>
    </DropdownMenuTrigger>
);

const NotificationHeader = ({ unreadCount, hasNotifications }: { unreadCount: number; hasNotifications: boolean }) => (
    <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-semibold text-sm">Notifications</h3>
        {hasNotifications && (
            <Badge variant="outline" className="text-xs h-5">
                {unreadCount}
            </Badge>
        )}
    </div>
);

const NotificationContent = ({
    notifications,
    hasNotifications,
}: {
    notifications: INotificationMenu['notifications'];
    hasNotifications: boolean;
}) => (
    <>
        {!hasNotifications ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No notifications
            </div>
        ) : (
            <ScrollArea className="h-80">
                <div className="divide-y">
                    {notifications.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </div>
            </ScrollArea>
        )}
    </>
);

const NotificationItem = ({ notification }: { notification: INotificationMenu['notifications'][0] }) => (
    <Link
        href={notification.href}
        className="group flex gap-2 px-4 py-2 hover:bg-accent transition-colors cursor-pointer"
    >
        <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {notification.title}
                </p>
                {!notification.read && <div className="size-1.5 rounded-full bg-primary shrink-0" />}
            </div>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{notification.description}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">{notification.time}</p>
        </div>
    </Link>
);

const NotificationFooter = () => (
    <div className="border-t px-4 py-2">
        <Link
            href="#"
            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors block text-center py-2"
        >
            View all
        </Link>
    </div>
);

// ============= TYPES =============
interface INotificationMenu {
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
