'use client';

import Link from 'next/link';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, SidebarProvider, SidebarInset, SidebarSeparator, } from '@/components/ui/sidebar';
import React, { ReactNode } from 'react';

// ============= MAIN COMPONENT =============
export default function DashboardSidebar({ sidebarItems, userRole, children }: IDashboardSidebar & { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <Sidebar collapsible="icon" className='overflow-hidden'>
                <SidebarHeaderContent userRole={userRole} />
                <SidebarContentContent items={sidebarItems} />
                <SidebarRail />
            </Sidebar>
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}

// ============= CHILD COMPONENTS =============
const SidebarHeaderContent = ({ userRole }: { userRole: string }) => (
    <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                    <Link href="/">
                        <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg font-bold text-sm">
                            E
                        </div>
                        <div className="flex flex-col gap-0.5 leading-none">
                            <span className="font-semibold">EduPortal</span>
                        </div>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarHeader>
);

const SidebarContentContent = ({ items }: { items: IDashboardSidebar['sidebarItems'] }) => (
    <SidebarContent>
        {items.map((group) => (
            <React.Fragment key={group.label || 'group'}>
                <SidebarGroup key={group.label || 'group'}>
                    {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
                    <SidebarGroupContent>
                        <SidebarMenuItems items={group.items} />
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator className='mx-auto' />
            </React.Fragment>

        ))}
    </SidebarContent>
);

const SidebarMenuItems = ({ items }: { items: IDashboardSidebar['sidebarItems'][0]['items'] }) => (
    <SidebarMenu>
        {items.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    isActive={item.active}
                >
                    <Link href={item.href} className='[&_svg]:size-4'>
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        ))}
    </SidebarMenu>
);

// ============= TYPES =============
interface IDashboardSidebar {
    sidebarItems: {
        label?: string;
        items: {
            label: string;
            href: string;
            icon?: ReactNode;
            active?: boolean;
        }[];
    }[];
    userRole: string;

}

