"use client"

import * as React from "react"
import { BarChart3, Bell, BookOpen, Bot, Building2, Calendar, CheckSquare, CreditCard, FileText, FolderKanban, GalleryVerticalEnd, GraduationCap, Home, Inbox, LayoutDashboard, LifeBuoy, LogOut, MessageSquare, Newspaper, PieChart, Plus, Settings, Shield, Sparkles, Star, Trash2, TrendingUp, User, UserPlus, Users, Zap, } from "lucide-react"
import { SidebarLayout, SidebarBrand, SidebarUser, SidebarInsetHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, type SidebarNavItem, } from "@/components/molecules/sidebar"
import { Dropdown } from "@/components/molecules/dropdown"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

// ─── SHARED ───────────────────────────────────────────────────────────────────

function Page({ label = "Main Content" }: { label?: string }) {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 overflow-auto">
            <div className="grid auto-rows-min gap-4 grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-video rounded-xl bg-muted/50" />
                ))}
            </div>
            <div className="min-h-64 flex-1 rounded-xl bg-muted/50 flex items-center justify-center">
                <span className="text-sm text-muted-foreground">{label}</span>
            </div>
        </div>
    )
}

const userActions = [
    { type: "label" as const, label: "My Account" },
    { label: "Profile", icon: User, onClick: () => { } },
    { label: "Billing", icon: CreditCard, onClick: () => { } },
    { label: "Settings", icon: Settings, onClick: () => { } },
    { type: "divider" as const },
    { label: "Log out", icon: LogOut, destructive: true, onClick: () => { } },
]

// ─── DEMO 1: Basic ────────────────────────────────────────────────────────────

export function Demo1() {
    const nav: SidebarNavItem[] = [
        {
            type: "group", label: "Application", items: [
                { label: "Home", href: "#", icon: Home, active: true },
                { label: "Inbox", href: "#", icon: Inbox, badge: 4 },
                { label: "Calendar", href: "#", icon: Calendar },
                { label: "Reports", href: "#", icon: BarChart3 },
                { label: "Settings", href: "#", icon: Settings },
            ]
        },
    ]
    return (
        <SidebarLayout
            nav={nav}
            header={<SidebarBrand logo={GalleryVerticalEnd} name="EduPortal " subtitle="School MIS" />}
            rail
            topbar={<SidebarInsetHeader />}
        >
            <Page />
        </SidebarLayout>
    )
}

// ─── DEMO 2: Multi-Group ──────────────────────────────────────────────────────

export function Demo2() {
    const nav: SidebarNavItem[] = [
        {
            type: "group", label: "Overview", items: [
                { label: "Dashboard", href: "#", icon: LayoutDashboard, active: true },
                { label: "Analytics", href: "#", icon: TrendingUp },
                { label: "Reports", href: "#", icon: PieChart },
            ]
        },
        { type: "separator" },
        {
            type: "group", label: "Academics", items: [
                { label: "Students", href: "#", icon: Users, badge: "12" },
                { label: "Teachers", href: "#", icon: GraduationCap },
                { label: "Classes", href: "#", icon: BookOpen },
                { label: "Results", href: "#", icon: CheckSquare },
            ]
        },
        { type: "separator" },
        {
            type: "group", label: "Finance", items: [
                { label: "Fees", href: "#", icon: CreditCard },
                { label: "Invoices", href: "#", icon: FileText },
            ]
        },
    ]
    return (
        <SidebarLayout
            nav={nav}
            header={<SidebarBrand logo={Building2} name="EduPortal " />}
            footer={<SidebarUser name="John Doe" email="john@edu.dev" avatarFallback="JD" />}
            topbar={<SidebarInsetHeader />}
        >
            <Page />
        </SidebarLayout>
    )
}

// ─── DEMO 3: Collapsible ──────────────────────────────────────────────────────

export function Demo3() {
    const nav: SidebarNavItem[] = [
        {
            type: "group", items: [
                { label: "Dashboard", href: "#", icon: LayoutDashboard, active: true },
                { label: "Notifications", href: "#", icon: Bell, badge: 3 },
            ]
        },
        { type: "separator" },
        {
            type: "group", label: "Sections", items: [
                {
                    type: "collapsible", label: "Students", icon: Users, defaultOpen: true, badge: 52,
                    items: [
                        { label: "All Students", href: "#" },
                        { label: "Admissions", href: "#" },
                        { label: "Attendance", href: "#" },
                        { label: "Transfers", href: "#" },
                    ],
                },
                {
                    type: "collapsible", label: "Teachers", icon: GraduationCap,
                    items: [
                        { label: "All Teachers", href: "#" },
                        { label: "Schedules", href: "#" },
                        { label: "Evaluations", href: "#" },
                    ],
                },
                {
                    type: "collapsible", label: "Fees", icon: CreditCard, badge: "!",
                    items: [
                        { label: "Fee Structure", href: "#" },
                        { label: "Payments", href: "#" },
                        { label: "Overdue", href: "#", badge: "5" },
                    ],
                },
            ]
        },
        { type: "separator" },
        {
            type: "group", items: [
                { label: "Settings", href: "#", icon: Settings },
                { label: "Help", href: "#", icon: LifeBuoy },
            ]
        },
    ]
    return (
        <SidebarLayout
            nav={nav}
            header={<SidebarBrand logo={GraduationCap} name="EduPortal " subtitle="v2.1.0" />}
            footer={<SidebarUser name="Admin User" email="admin@edu.dev" avatarFallback="AU" />}
            rail
            topbar={<SidebarInsetHeader />}
        >
            <Page />
        </SidebarLayout>
    )
}

// ─── DEMO 4: Deep Nesting ─────────────────────────────────────────────────────

export function Demo4() {
    const nav: SidebarNavItem[] = [
        {
            type: "group", label: "Documentation", items: [
                { label: "Overview", href: "#", icon: Home },
                {
                    type: "collapsible", label: "Getting Started", icon: Sparkles, defaultOpen: true,
                    items: [
                        { label: "Installation", href: "#" },
                        {
                            type: "collapsible", label: "Configuration", defaultOpen: false,
                            items: [
                                { label: "Basic Setup", href: "#" },
                                { label: "Advanced Options", href: "#" },
                                {
                                    type: "collapsible", label: "Plugins",
                                    items: [
                                        { label: "Auth Plugin", href: "#" },
                                        { label: "DB Plugin", href: "#" },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "collapsible", label: "API Reference", icon: FileText,
                    items: [
                        { label: "REST API", href: "#" },
                        { label: "GraphQL", href: "#" },
                        { label: "WebSockets", href: "#" },
                    ],
                },
            ]
        },
    ]
    return (
        <SidebarLayout
            nav={nav}
            header={<SidebarBrand logo={BookOpen} name="Docs" subtitle="v1.0" />}
            topbar={<SidebarInsetHeader />}
        >
            <Page label="Expand the nav to see deep nesting" />
        </SidebarLayout>
    )
}

// ─── DEMO 5: Icon Mode ────────────────────────────────────────────────────────

export function Demo5() {
    const nav: SidebarNavItem[] = [
        {
            type: "group", items: [
                { label: "Dashboard", href: "#", icon: LayoutDashboard, active: true, tooltip: "Dashboard" },
                { label: "Students", href: "#", icon: Users, tooltip: "Students", badge: 9 },
                { label: "Teachers", href: "#", icon: GraduationCap, tooltip: "Teachers" },
                { label: "Calendar", href: "#", icon: Calendar, tooltip: "Calendar" },
                { label: "Messages", href: "#", icon: MessageSquare, tooltip: "Messages", badge: 2 },
                { label: "Reports", href: "#", icon: BarChart3, tooltip: "Reports" },
            ]
        },
        { type: "separator" },
        {
            type: "group", label: "System", items: [
                { label: "Settings", href: "#", icon: Settings, tooltip: "Settings" },
                { label: "Help", href: "#", icon: LifeBuoy, tooltip: "Help" },
            ]
        },
    ]
    return (
        <SidebarLayout
            nav={nav}
            header={<SidebarBrand logo={Zap} name="EduPortal " />}
            footer={<SidebarUser name="Jane Smith" avatarFallback="JS" />}
            collapsible="icon"
            rail
            topbar={<SidebarInsetHeader><span className="text-sm text-muted-foreground">Toggle sidebar →</span></SidebarInsetHeader>}
        >
            <Page label="Toggle sidebar with the trigger button" />
        </SidebarLayout>
    )
}

// ─── DEMO 6: Search ───────────────────────────────────────────────────────────

export function Demo6() {
    const [query, setQuery] = React.useState("")

    const allItems = [
        { label: "Dashboard", href: "#", icon: LayoutDashboard },
        { label: "Students", href: "#", icon: Users },
        { label: "Teachers", href: "#", icon: GraduationCap },
        { label: "Calendar", href: "#", icon: Calendar },
        { label: "Reports", href: "#", icon: BarChart3 },
        { label: "Settings", href: "#", icon: Settings },
        { label: "Fees", href: "#", icon: CreditCard },
        { label: "Notices", href: "#", icon: Newspaper },
    ]

    const filtered = allItems.filter((i) => !query || i.label.toLowerCase().includes(query.toLowerCase()))

    const nav: SidebarNavItem[] = [
        {
            type: "group", label: query ? `Results (${filtered.length})` : "All Pages", items: filtered.length > 0 ? filtered : [
                { type: "custom" as const, children: <p className="px-2 py-4 text-center text-xs text-muted-foreground">No results</p> } as SidebarNavItem
            ]
        },
    ]

    return (
        <SidebarLayout
            nav={nav}
            search={{ placeholder: "Search pages…", value: query, onChange: setQuery, autoFilter: false }}
            header={<SidebarBrand logo={GalleryVerticalEnd} name="EduPortal " subtitle="v2.0" />}
            rail
            topbar={<SidebarInsetHeader />}
        >
            <Page label="Search for pages in the sidebar" />
        </SidebarLayout>
    )
}

// ─── DEMO 7: User Footer ──────────────────────────────────────────────────────

export function Demo7() {
    const nav: SidebarNavItem[] = [
        {
            type: "group", label: "Overview", items: [
                { label: "Dashboard", href: "#", icon: LayoutDashboard, active: true },
                { label: "Analytics", href: "#", icon: TrendingUp },
                { label: "Reports", href: "#", icon: PieChart },
            ]
        },
        { type: "separator" },
        {
            type: "group", label: "Academics", items: [
                { label: "Students", href: "#", icon: Users },
                { label: "Teachers", href: "#", icon: GraduationCap },
            ]
        },
    ]
    return (
        <SidebarLayout
            nav={nav}
            header={<SidebarBrand logo={Building2} name="EduPortal " subtitle="Admin" />}
            footer={
                <SidebarUser
                    name="John Doe"
                    email="john@edu.dev"
                    avatarFallback="JD"
                    actions={userActions}
                />
            }
            topbar={<SidebarInsetHeader />}
        >
            <Page />
        </SidebarLayout>
    )
}

// ─── DEMO 8: Item Actions ─────────────────────────────────────────────────────

export function Demo8() {
    const nav: SidebarNavItem[] = [
        {
            type: "group", label: "Projects",
            action: () => { }, actionIcon: Plus, actionTitle: "Add project",
            items: [
                {
                    label: "Design Engineering", href: "#", icon: FolderKanban,
                    actions: [
                        { label: "View project", icon: BookOpen },
                        { label: "Share", icon: UserPlus },
                        { type: "divider" as const },
                        { label: "Delete", icon: Trash2, destructive: true },
                    ],
                },
                {
                    label: "Sales & Marketing", href: "#", icon: TrendingUp,
                    actions: [
                        { label: "View project", icon: BookOpen },
                        { label: "Share", icon: UserPlus },
                        { type: "divider" as const },
                        { label: "Delete", icon: Trash2, destructive: true },
                    ],
                },
                {
                    label: "AI Research", href: "#", icon: Bot, badge: "new",
                    actions: [
                        { label: "View project", icon: BookOpen },
                        { label: "Archive", icon: Star },
                        { type: "divider" as const },
                        { label: "Delete", icon: Trash2, destructive: true },
                    ],
                },
            ],
        },
        { type: "separator" },
        {
            type: "group", items: [
                { label: "Help & Support", href: "#", icon: LifeBuoy },
                { label: "Feedback", href: "#", icon: MessageSquare },
            ]
        },
    ]
    return (
        <SidebarLayout
            nav={nav}
            header={<SidebarBrand logo={FolderKanban} name="Projects" />}
            footer={<SidebarUser name="Dev User" avatarFallback="DV" actions={userActions} />}
            rail
            topbar={<SidebarInsetHeader />}
        >
            <Page label="Hover items to see action buttons" />
        </SidebarLayout>
    )
}

// ─── DEMO 9: Floating ─────────────────────────────────────────────────────────

export function Demo9() {
    const nav: SidebarNavItem[] = [
        {
            type: "group", items: [
                { label: "Dashboard", href: "#", icon: LayoutDashboard, active: true },
                { label: "Analytics", href: "#", icon: TrendingUp },
                { label: "Users", href: "#", icon: Users },
                { label: "Calendar", href: "#", icon: Calendar },
                { label: "Settings", href: "#", icon: Settings },
            ]
        },
    ]
    return (
        <SidebarLayout
            nav={nav}
            header={<SidebarBrand logo={Sparkles} name="EduPortal " />}
            variant="floating"
            topbar={<SidebarInsetHeader />}
        >
            <Page />
        </SidebarLayout>
    )
}

// ─── DEMO 10: Inset ───────────────────────────────────────────────────────────

export function Demo10() {
    const nav: SidebarNavItem[] = [
        {
            type: "group", label: "Navigation", items: [
                { label: "Dashboard", href: "#", icon: LayoutDashboard, active: true },
                { label: "Team", href: "#", icon: Users },
                { label: "Projects", href: "#", icon: FolderKanban },
                { label: "Billing", href: "#", icon: CreditCard },
                { label: "Settings", href: "#", icon: Settings },
            ]
        },
    ]
    return (
        <SidebarLayout
            nav={nav}
            header={<SidebarBrand logo={LayoutDashboard} name="EduPortal " />}
            variant="inset"
            classNames={{ provider: "bg-sidebar" }}
            topbar={<SidebarInsetHeader />}
        >
            <Page />
        </SidebarLayout>
    )
}

// ─── DEMO 11: Loading ─────────────────────────────────────────────────────────

export function Demo11() {
    return (
        <SidebarLayout
            nav={[]}
            loading
            skeletonCount={6}
            header={<SidebarBrand logo={GalleryVerticalEnd} name="Loading…" />}
            topbar={<SidebarInsetHeader />}
        >
            <Page label="Sidebar is loading…" />
        </SidebarLayout>
    )
}

// ─── DEMO 12: classNames + CSS Variable Customization ────────────────────────

export function Demo12() {
    const nav: SidebarNavItem[] = [
        {
            type: "group", label: "Main Menu", items: [
                { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                { label: "Users", href: "/dashboard/users", icon: Users },
                { label: "Analytics", href: "#", icon: BarChart3 },
                { label: "Settings", href: "#", icon: Settings },
            ]
        },
        { type: "separator" },
        {
            type: "group", label: "Resources", items: [
                { label: "Docs", href: "#", icon: BookOpen },
                { label: "Support", href: "#", icon: LifeBuoy },
            ]
        },
    ]
    return (
        <SidebarLayout
            nav={nav}
            header={<SidebarBrand logo={Star} name="Dark Theme" subtitle="CSS vars demo" />}
            footer={<SidebarUser name="Custom User" avatarFallback="CU" />}
            providerStyle={{
                "--sidebar-background": "hsl(222.2 47.4% 11.2%)",
                "--sidebar-foreground": "hsl(210 40% 98%)",
                "--sidebar-accent": "hsl(217.2 32.6% 17.5%)",
                "--sidebar-accent-foreground": "hsl(210 40% 98%)",
                "--sidebar-border": "hsl(217.2 32.6% 17.5%)",
            } as React.CSSProperties}
            classNames={{
                groupLabel: "text-white/50",
                separator: "bg-white/10",
                menuButton: "text-white/80 hover:text-white",
                itemIcon: "text-white/60",
            }}
            topbar={<SidebarInsetHeader />}
        >
            <Page label="Sidebar themed via CSS variable overrides + classNames" />
        </SidebarLayout>
    )
}

// ─── DEMO 13: Custom Items ────────────────────────────────────────────────────

export function Demo13() {
    const nav: SidebarNavItem[] = [
        {
            type: "group", items: [
                { label: "Dashboard", href: "#", icon: LayoutDashboard, active: true },
                { label: "Analytics", href: "#", icon: BarChart3 },
            ]
        },
        { type: "separator" },
        {
            type: "custom",
            children: (
                <div className="px-3 py-2 mx-2 my-1 rounded-lg bg-sidebar-accent/50 text-sm">
                    <div className="flex items-center gap-2 font-medium">
                        <Sparkles className="size-4 text-yellow-500" />
                        Upgrade to Pro
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Unlock all features and integrations.</p>
                </div>
            ),
        },
        { type: "separator" },
        {
            type: "group", items: [
                { label: "Settings", href: "#", icon: Settings },
                { label: "Help", href: "#", icon: LifeBuoy },
            ]
        },
    ]
    return (
        <SidebarLayout
            nav={nav}
            header={<SidebarBrand logo={Sparkles} name="Pro Demo" />}
            topbar={<SidebarInsetHeader />}
        >
            <Page label="Custom promo element injected in nav" />
        </SidebarLayout>
    )
}

// ─── DEMO 14: Full Featured ───────────────────────────────────────────────────

export function Demo14() {
    const [query, setQuery] = React.useState("")

    const nav: SidebarNavItem[] = [
        {
            type: "group", items: [
                { label: "Dashboard", href: "#", icon: LayoutDashboard, active: true },
                { label: "Inbox", href: "#", icon: Inbox, badge: 9 },
            ]
        },
        { type: "separator" },
        {
            type: "group", label: "Academics",
            action: () => { }, actionIcon: Plus, actionTitle: "Add",
            items: [
                {
                    type: "collapsible", label: "Students", icon: Users, defaultOpen: true,
                    items: [
                        { label: "Overview", href: "#", active: true },
                        { label: "Admissions", href: "#" },
                        { label: "Attendance", href: "#", badge: 2 },
                    ],
                },
                {
                    type: "collapsible", label: "Teachers", icon: GraduationCap,
                    items: [
                        { label: "All Teachers", href: "#" },
                        { label: "Schedules", href: "#" },
                    ],
                },
                { label: "Classes", href: "#", icon: BookOpen },
                { label: "Results", href: "#", icon: CheckSquare },
            ],
        },
        { type: "separator" },
        {
            type: "group", label: "Finance", items: [
                {
                    label: "Fees", href: "#", icon: CreditCard,
                    actions: [
                        { label: "Manage", icon: Settings },
                        { label: "Export", icon: FileText },
                    ],
                },
                { label: "Reports", href: "#", icon: PieChart },
            ]
        },
        { type: "separator" },
        {
            type: "group", items: [
                { label: "Settings", href: "#", icon: Settings },
                { label: "Security", href: "#", icon: Shield },
                { label: "Help", href: "#", icon: LifeBuoy },
            ]
        },
    ]

    return (
        <SidebarLayout
            nav={nav}
            header={<SidebarBrand logo={GraduationCap} name="EduPortal " subtitle="School MIS" />}
            footer={
                <SidebarUser
                    name="Principal Ahmed"
                    email="ahmed@EduPortal .dev"
                    avatarFallback="PA"
                    actions={userActions}
                />
            }
            search={{ placeholder: "Quick search…", value: query, onChange: setQuery }}
            rail
            topbar={<SidebarInsetHeader><Badge variant="secondary">Full Demo</Badge></SidebarInsetHeader>}
        >
            <Page label="All sidebar features active" />
        </SidebarLayout>
    )
}

// ─── DEMO 15: SaaS/Admin Dashboard ───────────────────────────────────────────

export function Demo15() {
    const [activeTeam, setActiveTeam] = React.useState("Acme Corp")
    const teams = ["Acme Corp", "Globex Inc", "Initech LLC"]

    const nav: SidebarNavItem[] = [
        {
            type: "group", items: [
                { label: "Dashboard", href: "#", icon: LayoutDashboard, active: true },
                { label: "Activity", href: "#", icon: Zap, badge: 12 },
            ]
        },
        { type: "separator" },
        {
            type: "group", label: "Workspace", items: [
                {
                    type: "collapsible", label: "Data", icon: BarChart3, defaultOpen: true,
                    items: [
                        { label: "Analytics", href: "#" },
                        { label: "Reports", href: "#" },
                        { label: "Exports", href: "#" },
                    ],
                },
                {
                    type: "collapsible", label: "Team", icon: Users,
                    items: [
                        { label: "Members", href: "#" },
                        { label: "Roles & Permissions", href: "#" },
                        { label: "Invitations", href: "#", badge: 3 },
                    ],
                },
                {
                    type: "collapsible", label: "Billing", icon: CreditCard,
                    items: [
                        { label: "Plans", href: "#" },
                        { label: "Invoices", href: "#" },
                        { label: "Usage", href: "#" },
                    ],
                },
            ]
        },
        { type: "separator" },
        {
            type: "group", label: "Configure", items: [
                { label: "Integrations", href: "#", icon: Zap },
                { label: "Webhooks", href: "#", icon: Bell },
                { label: "API Keys", href: "#", icon: Shield },
                { label: "Settings", href: "#", icon: Settings },
            ]
        },
        { type: "separator" },
        {
            type: "group", items: [
                { label: "Help Center", href: "#", icon: LifeBuoy },
                { label: "Feedback", href: "#", icon: MessageSquare },
            ]
        },
    ]

    return (
        <SidebarLayout
            collapsible="icon"
            nav={nav}
            header={
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Dropdown
                            trigger={
                                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shrink-0">
                                        <Building2 className="size-4" />
                                    </div>
                                    <div className="flex flex-col text-left text-sm leading-tight">
                                        <span className="font-semibold truncate">{activeTeam}</span>
                                        <span className="text-xs text-sidebar-foreground/60 truncate">Free plan</span>
                                    </div>
                                    <ChevronRight className="ml-auto size-4 rotate-90" />
                                </SidebarMenuButton>
                            }
                            items={teams.map(t => ({ label: t, onClick: () => setActiveTeam(t) }))}
                            side="right"
                            align="start"
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
            }
            footer={<SidebarUser name="Jane Smith" email="jane@acme.com" avatarFallback="JS" actions={userActions} />}
            rail
            persistScrollKey="demo15-scroll"
            topbar={<SidebarInsetHeader />}
        >
            <Page label="SaaS Admin — team switcher, nested nav, full user footer" />
        </SidebarLayout>
    )
}

// ─── DEMO 16: School MIS ──────────────────────────────────────────────────────

export function Demo16() {
    const [query, setQuery] = React.useState("")
    const nav: SidebarNavItem[] = [
        {
            type: "group", items: [
                { label: "Overview", href: "#", icon: Home, active: true },
                { label: "Notices", href: "#", icon: Bell, badge: 2 },
                { label: "Messages", href: "#", icon: MessageSquare, badge: 7 },
            ]
        },
        { type: "separator" },
        {
            type: "group", label: "Academics",
            action: () => { }, actionIcon: Plus, actionTitle: "New Class",
            items: [
                {
                    type: "collapsible", label: "Students", icon: Users, defaultOpen: true, badge: "1.2k",
                    items: [
                        { label: "All Students", href: "#" },
                        { label: "Admissions", href: "#", badge: 8 },
                        { label: "Attendance", href: "#" },
                        { label: "Transfers", href: "#" },
                        { label: "Certificates", href: "#" },
                    ],
                },
                {
                    type: "collapsible", label: "Teachers", icon: GraduationCap, badge: 84,
                    items: [
                        { label: "All Teachers", href: "#" },
                        { label: "Schedules", href: "#" },
                        { label: "Leave Requests", href: "#", badge: 3 },
                        { label: "Performance", href: "#" },
                    ],
                },
                {
                    type: "collapsible", label: "Classes", icon: BookOpen,
                    items: [
                        { label: "Timetable", href: "#" },
                        { label: "Subjects", href: "#" },
                        { label: "Assignments", href: "#" },
                    ],
                },
                {
                    type: "collapsible", label: "Exams & Results", icon: CheckSquare,
                    items: [
                        { label: "Schedule", href: "#" },
                        { label: "Results", href: "#" },
                        { label: "Report Cards", href: "#" },
                    ],
                },
            ]
        },
        { type: "separator" },
        {
            type: "group", label: "Finance", items: [
                {
                    type: "collapsible", label: "Fees", icon: CreditCard, badge: "!",
                    items: [
                        { label: "Fee Structure", href: "#" },
                        { label: "Collect Fee", href: "#" },
                        { label: "Overdue", href: "#", badge: 15 },
                        { label: "Receipts", href: "#" },
                    ],
                },
                { label: "Payroll", href: "#", icon: TrendingUp },
                { label: "Budget", href: "#", icon: PieChart },
            ]
        },
        { type: "separator" },
        {
            type: "group", label: "Administration", items: [
                { label: "Users & Roles", href: "#", icon: Shield },
                { label: "Reports", href: "#", icon: FileText },
                {
                    label: "Settings", href: "#", icon: Settings,
                    actions: [
                        { label: "General", icon: Settings },
                        { label: "Security", icon: Shield },
                        { type: "divider" as const },
                        { label: "Backup", icon: FileText },
                    ],
                },
            ]
        },
    ]
    return (
        <SidebarLayout
            nav={nav}
            header={<SidebarBrand logo={GraduationCap} name="EduPortal " subtitle="School MIS v2" />}
            footer={<SidebarUser name="Principal Ahmed" email="principal@edu.dev" avatarFallback="PA" actions={userActions} />}
            search={{ placeholder: "Search EduPortal …", value: query, onChange: setQuery }}
            rail
            persistScrollKey="demo16-scroll"
            topbar={<SidebarInsetHeader><Badge variant="outline">School MIS</Badge></SidebarInsetHeader>}
        >
            <Page label="Full school management information system sidebar" />
        </SidebarLayout>
    )
}

// ─── DEMO 17: Dev Tool / IDE-like ─────────────────────────────────────────────

export function Demo17() {
    const nav: SidebarNavItem[] = [
        {
            type: "group", items: [
                { label: "Explorer", href: "#", icon: FolderKanban, active: true, tooltip: "Explorer" },
                { label: "Search", href: "#", icon: Inbox, tooltip: "Search" },
                { label: "Source Control", href: "#", icon: Bot, badge: 3, tooltip: "Source Control" },
                { label: "Run & Debug", href: "#", icon: Zap, tooltip: "Run & Debug" },
                { label: "Extensions", href: "#", icon: Sparkles, badge: 1, tooltip: "Extensions" },
            ]
        },
        { type: "separator" },
        {
            type: "group", label: "Workspace", items: [
                {
                    type: "collapsible", label: "src", icon: FolderKanban, defaultOpen: true,
                    items: [
                        {
                            type: "collapsible", label: "app", icon: FolderKanban, defaultOpen: true,
                            items: [
                                { label: "page.tsx", href: "#", icon: FileText },
                                { label: "layout.tsx", href: "#", icon: FileText, active: true },
                                { label: "globals.css", href: "#", icon: FileText },
                            ],
                        },
                        {
                            type: "collapsible", label: "components", icon: FolderKanban,
                            items: [
                                { label: "sidebar.tsx", href: "#", icon: FileText },
                                { label: "dropdown.tsx", href: "#", icon: FileText },
                            ],
                        },
                        { label: "index.ts", href: "#", icon: FileText },
                    ],
                },
                {
                    type: "collapsible", label: "config", icon: FolderKanban,
                    items: [
                        { label: "next.config.ts", href: "#", icon: FileText },
                        { label: "tsconfig.json", href: "#", icon: FileText },
                    ],
                },
            ]
        },
        { type: "separator" },
        {
            type: "group", items: [
                { label: "Problems", href: "#", icon: Bell, badge: 2 },
                { label: "Output", href: "#", icon: BarChart3 },
                { label: "Terminal", href: "#", icon: Zap },
            ]
        },
    ]
    return (
        <SidebarLayout
            nav={nav}
            header={<SidebarBrand logo={FolderKanban} name="my-project" subtitle="Next.js 16" />}
            collapsible="icon"
            rail
            persistScrollKey="demo17-scroll"
            topbar={<SidebarInsetHeader />}
        >
            <Page label="IDE / file explorer style sidebar with deep nesting" />
        </SidebarLayout>
    )
}

// ─── DEMO 18: Multi-tenant / Role-based ──────────────────────────────────────

const ROLES = {
    admin: [
        {
            type: "group" as const, label: "Admin", items: [
                { label: "Dashboard", href: "#", icon: LayoutDashboard, active: true },
                { label: "All Users", href: "#", icon: Users, badge: "2.4k" },
                { label: "Roles & Permissions", href: "#", icon: Shield },
                { label: "Audit Logs", href: "#", icon: FileText },
                { label: "System Health", href: "#", icon: TrendingUp },
            ]
        },
        { type: "separator" as const },
        {
            type: "group" as const, items: [
                { label: "Settings", href: "#", icon: Settings },
                { label: "API Keys", href: "#", icon: Zap },
            ]
        },
    ] as SidebarNavItem[],
    teacher: [
        {
            type: "group" as const, label: "Teaching", items: [
                { label: "My Classes", href: "#", icon: BookOpen, active: true },
                { label: "Timetable", href: "#", icon: Calendar },
                { label: "Grade Book", href: "#", icon: CheckSquare },
                { label: "Attendance", href: "#", icon: Users },
                { label: "Assignments", href: "#", icon: FileText, badge: 5 },
            ]
        },
        { type: "separator" as const },
        {
            type: "group" as const, items: [
                { label: "Messages", href: "#", icon: MessageSquare, badge: 2 },
                { label: "Profile", href: "#", icon: User },
            ]
        },
    ] as SidebarNavItem[],
    student: [
        {
            type: "group" as const, label: "My School", items: [
                { label: "Dashboard", href: "#", icon: Home, active: true },
                { label: "My Classes", href: "#", icon: BookOpen },
                { label: "Timetable", href: "#", icon: Calendar },
                { label: "Assignments", href: "#", icon: CheckSquare, badge: 3 },
                { label: "Results", href: "#", icon: Star },
                { label: "Fees", href: "#", icon: CreditCard },
            ]
        },
        { type: "separator" as const },
        {
            type: "group" as const, items: [
                { label: "Notices", href: "#", icon: Bell, badge: 1 },
                { label: "Messages", href: "#", icon: MessageSquare },
            ]
        },
    ] as SidebarNavItem[],
}

type RoleKey = keyof typeof ROLES

export function Demo18() {
    const [role, setRole] = React.useState<RoleKey>("admin")
    const roleLabels: { key: RoleKey; label: string }[] = [
        { key: "admin", label: "Admin" },
        { key: "teacher", label: "Teacher" },
        { key: "student", label: "Student" },
    ]

    return (
        <SidebarLayout
            nav={ROLES[role]}
            header={<SidebarBrand logo={Shield} name="EduPortal " subtitle={`Role: ${role}`} />}
            footer={<SidebarUser name="Demo User" email="user@edu.dev" avatarFallback="DU" actions={userActions} />}
            rail
            topbar={
                <SidebarInsetHeader>
                    <div className="flex gap-1">
                        {roleLabels.map(r => (
                            <button
                                key={r.key}
                                onClick={() => setRole(r.key)}
                                className={cn(
                                    "rounded px-2.5 py-1 text-xs font-medium transition-colors",
                                    role === r.key
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                </SidebarInsetHeader>
            }
        >
            <Page label="Switch roles to see a different sidebar navigation" />
        </SidebarLayout>
    )
}

// ─── REGISTRY ─────────────────────────────────────────────────────────────────

export const DEMOS: { id: number; title: string; description: string; component: React.FC }[] = [
    { id: 1, title: "Basic Nav List", description: "Simple flat nav items with icons, badges, and active state.", component: Demo1 },
    { id: 2, title: "Multi-Group Nav", description: "Multiple labelled groups separated by dividers.", component: Demo2 },
    { id: 3, title: "Collapsible Sections", description: "Collapsible groups with auto-expand support and nested sub-items.", component: Demo3 },
    { id: 4, title: "Deep Nesting (3 levels)", description: "Recursive collapsibles — unlimited depth via automatic recursion.", component: Demo4 },
    { id: 5, title: "Icon-Only Collapsed Mode", description: 'collapsible="icon" — collapses to icon rail, tooltips on hover.', component: Demo5 },
    { id: 6, title: "Search Input", description: "Inline search filters nav items in real-time.", component: Demo6 },
    { id: 7, title: "User Profile Footer", description: "SidebarUser slot with avatar, name, email, and dropdown actions.", component: Demo7 },
    { id: 8, title: "Per-Item Dropdown Actions", description: "Each nav item has a hover-triggered MoreHorizontal action dropdown.", component: Demo8 },
    { id: 9, title: "Floating Variant", description: 'variant="floating" — sidebar has inset shadow effect.', component: Demo9 },
    { id: 10, title: "Inset Variant", description: 'variant="inset" — sidebar is inset inside the page container.', component: Demo10 },
    { id: 11, title: "Loading Skeleton", description: "loading={true} renders skeleton placeholders while data loads.", component: Demo11 },
    { id: 12, title: "CSS Var + classNames Theme", description: "Override sidebar CSS vars via providerStyle for full dark/custom theming.", component: Demo12 },
    { id: 13, title: "Custom Items", description: 'type="custom" — inject any ReactNode into the nav tree.', component: Demo13 },
    { id: 14, title: "Full Featured", description: "All features combined: brand, search, collapsibles, actions, user footer.", component: Demo14 },
    { id: 15, title: "SaaS Dashboard", description: "Team switcher header, nested workspace nav, billing section.", component: Demo15 },
    { id: 16, title: "School MIS", description: "Industry-grade school MIS: students, teachers, fees, admin, search.", component: Demo16 },
    { id: 17, title: "IDE / Explorer", description: "File-tree style sidebar with collapsible folders and icon-only mode.", component: Demo17 },
    { id: 18, title: "Role-Based Nav", description: "Switch between Admin / Teacher / Student roles to see nav change.", component: Demo18 },
]
