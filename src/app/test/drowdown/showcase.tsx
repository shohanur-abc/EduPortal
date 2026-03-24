"use client"

import * as React from "react"
import {
    Bell,
    BookOpen,
    ChevronDown,
    CreditCard,
    FileText,
    GitCompareArrows,
    Globe,
    HelpCircle,
    KeyRound,
    LayoutDashboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    MoreHorizontal,
    Settings,
    Plus,
    Shield,
    ShieldAlert,
    Star,
    Trash2,
    User,
    UserPlus,
    Users,
    Zap,
    Link,
} from "@/lib/icon"

import { Dropdown, type DropdownItem } from "@/components/molecules/dropdown"
import { Button, Badge, AvatarMolecule } from "@/components/molecules"
// ─── 1. BASIC ACTIONS ──────────────────────────────────────────────────────────
const basicItems: DropdownItem[] = [
    { type: "item", label: "New File", icon: FileText, shortcut: "⌘N" },
    { type: "item", label: "New Folder", icon: Plus, shortcut: "⌘⇧N" },
    { type: "divider" },
    { type: "item", label: "Open…", shortcut: "⌘O" },
    { type: "divider" },
    { type: "item", label: "Delete", icon: Trash2, destructive: true, shortcut: "⌫" },
]

// ─── 2. FULL ACCOUNT MENU (with group + submenu) ───────────────────────────────
const accountItems: DropdownItem[] = [
    {
        type: "group",
        label: "My Account",
        items: [
            { type: "item", label: "Profile", icon: User, shortcut: "⇧⌘P" },
            { type: "item", label: "Billing", icon: CreditCard, shortcut: "⌘B" },
            { type: "item", label: "Settings", icon: Settings, shortcut: "⌘S" },
            { type: "item", label: "Keyboard shortcuts", icon: KeyRound, shortcut: "⌘K" },
        ],
    },
    { type: "divider" },
    {
        type: "group",
        label: "Team",
        items: [
            { type: "item", label: "Team", icon: Users },
            {
                type: "submenu",
                label: "Invite users",
                icon: UserPlus,
                items: [
                    { type: "item", label: "Email", icon: Mail },
                    { type: "item", label: "Message", icon: MessageSquare },
                    { type: "divider" },
                    {
                        type: "submenu",
                        label: "More options",
                        items: [
                            { type: "item", label: "Copy invite link", icon: Link },
                            { type: "item", label: "Send via Slack" },
                            { type: "item", label: "Send via Teams" },
                        ],
                    },
                ],
            },
            { type: "item", label: "New Team", icon: Plus, shortcut: "⌘+T" },
        ],
    },
    { type: "divider" },
    { type: "link", label: "GitHub", href: "https://github.com", icon: GitCompareArrows, external: true },
    { type: "link", label: "Support", href: "/support", icon: LifeBuoy },
    { type: "item", label: "API", disabled: true, icon: Zap },
    { type: "divider" },
    { type: "item", label: "Log out", icon: LogOut, destructive: true, shortcut: "⇧⌘Q" },
]

// ─── 3. CHECKBOX ITEMS ────────────────────────────────────────────────────────
function CheckboxDropdown() {
    const [showStatusBar, setShowStatusBar] = React.useState(true)
    const [showActivity, setShowActivity] = React.useState(false)
    const [showPanel, setShowPanel] = React.useState(false)

    const checkboxItems: DropdownItem[] = [
        { type: "label", label: "Appearance" },
        { type: "checkbox", label: "Status Bar", checked: showStatusBar, onCheckedChange: setShowStatusBar },
        { type: "checkbox", label: "Activity Bar", checked: showActivity, onCheckedChange: setShowActivity },
        { type: "checkbox", label: "Panel", checked: showPanel, onCheckedChange: setShowPanel },
    ]

    return (
        <Dropdown
            trigger={<Button variant="outline" rightIcon={<ChevronDown className="size-4" />}>
                View
            </Button>}
            items={checkboxItems}
            align="start"
            contentWidth="12rem"
        />
    )
}

// ─── 4. RADIO GROUP ───────────────────────────────────────────────────────────
function RadioDropdown() {
    const [position, setPosition] = React.useState("bottom")

    const radioItems: DropdownItem[] = [
        {
            type: "radio-group",
            label: "Panel Position",
            value: position,
            onValueChange: setPosition,
            options: [
                { value: "top", label: "Top" },
                { value: "bottom", label: "Bottom" },
                { value: "right", label: "Right" },
            ],
        },
    ]

    return (
        <Dropdown
            trigger={<Button variant="outline" rightIcon={<ChevronDown className="size-4" />}>
                Position: {position}
            </Button>}
            items={radioItems}
            align="start"
        />
    )
}

// ─── 5. CONTEXT / RIGHT-CLICK STYLE (destructive actions) ─────────────────────
const contextItems: DropdownItem[] = [
    { type: "item", label: "View", icon: BookOpen },
    { type: "item", label: "Edit", icon: FileText },
    { type: "item", label: "Duplicate", icon: Plus },
    { type: "divider" },
    {
        type: "submenu",
        label: "Share",
        icon: Link,
        items: [
            { type: "item", label: "Email link", icon: Mail },
            { type: "item", label: "Copy link", icon: Globe },
        ],
    },
    { type: "divider" },
    { type: "item", label: "Archive", icon: FileText },
    { type: "item", label: "Move to trash", icon: Trash2, destructive: true },
]

// ─── 6. NOTIFICATION MENU (badge + description) ───────────────────────────────
const notifItems: DropdownItem[] = [
    { type: "label", label: "Notifications" },
    { type: "divider" },
    { type: "item", label: "New message", icon: MessageSquare, description: "2 min ago", badge: "2" },
    { type: "item", label: "Assignment graded", icon: Star, description: "1 hr ago" },
    { type: "item", label: "System alert", icon: Bell, description: "Yesterday", badge: "!" },
    { type: "divider" },
    { type: "link", label: "View all notifications", href: "/notifications" },
]

// ─── 7. CUSTOM ITEM (custom children) ─────────────────────────────────────────
const customItems: DropdownItem[] = [
    { type: "label", label: "Workspaces" },
    {
        type: "custom",
        children: (
            <div className="flex items-center gap-3 px-1 py-0.5">
                <AvatarMolecule src="/avatars/01.png" fallback="JD" className="size-7" />
                <div className="flex flex-col leading-tight">
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">john@EduPortal .dev</span>
                </div>
                <Badge variant="secondary" className="ml-auto">Admin</Badge>
            </div>
        ),
    },
    { type: "divider" },
    { type: "item", label: "Switch workspace", icon: LayoutDashboard },
    { type: "item", label: "Create new", icon: Plus },
]

// ─── 8. SECURITY MENU (link items) ────────────────────────────────────────────
const securityItems: DropdownItem[] = [
    {
        type: "group",
        label: "Security",
        items: [
            { type: "link", label: "Privacy settings", href: "/settings/privacy", icon: Shield },
            { type: "link", label: "Two-factor auth", href: "/settings/2fa", icon: KeyRound, description: "Enabled" },
            { type: "link", label: "Active sessions", href: "/settings/sessions", icon: Globe },
        ],
    },
    { type: "divider" },
    {
        type: "group",
        label: "Danger Zone",
        items: [
            { type: "item", label: "Suspend account", icon: ShieldAlert, destructive: true },
            { type: "item", label: "Delete account", icon: Trash2, destructive: true },
        ],
    },
]

// ─── 9. THEME SWITCHER (radio) ────────────────────────────────────────────────
function ThemeDropdown() {
    const [theme, setTheme] = React.useState("system")

    const themeItems: DropdownItem[] = [
        {
            type: "radio-group",
            label: "Theme",
            value: theme,
            onValueChange: setTheme,
            options: [
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
                { value: "system", label: "System" },
            ],
        },
    ]

    return (
        <Dropdown
            trigger={
                <Button variant="outline" size="sm" leftIcon={<Settings className="size-4" />}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </Button>
            }
            items={themeItems}
            align="start"
        />
    )
}

// ─── SHOWCASE ─────────────────────────────────────────────────────────────────

const ShowcaseSection = ({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) => (
    <div className="space-y-3">
        <div>
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        <div className="flex flex-wrap gap-3">{children}</div>
    </div>
)

export function DropdownShowcase() {
    return (
        <div className="space-y-12 p-8 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dropdown System</h1>
                <p className="mt-2 text-muted-foreground">
                    Production-grade fully props-driven dropdown molecule. Every item type, nesting level, and customization variant in one place.
                </p>
            </div>

            <div className="grid gap-10 @container">
                <ShowcaseSection title="1. Basic Actions" description="Simple menu items with icons, shortcuts, and destructive intent.">
                    <Dropdown
                        trigger={<Button variant="outline" rightIcon={<ChevronDown className="size-4" />}>
                            File
                        </Button>}
                        items={basicItems}
                        align="start"
                        contentWidth="14rem"
                    />
                </ShowcaseSection>

                <ShowcaseSection title="2. Account Menu" description="Groups, separators, deep recursive submenus (3 levels), disabled items, and external links.">
                    <Dropdown
                        trigger={
                            <Button variant="outline" leftIcon={<AvatarMolecule fallback="JD" className="size-5" />} rightIcon={<ChevronDown className="size-4" />}>
                                Account
                            </Button>
                        }
                        items={accountItems}
                        align="start"
                        contentWidth="14rem"
                    />
                </ShowcaseSection>

                <ShowcaseSection title="3. Checkbox Items" description="Toggle options with controlled state.">
                    <CheckboxDropdown />
                </ShowcaseSection>

                <ShowcaseSection title="4. Radio Group" description="Single-select option from a set.">
                    <RadioDropdown />
                </ShowcaseSection>

                <ShowcaseSection title="5. Context Menu Style" description="Document/record actions with confirm-delete destructive item.">
                    <Dropdown
                        trigger={
                            <Button variant="ghost" className="size-8 p-0">
                                <MoreHorizontal className="size-4" />
                            </Button>
                        }
                        items={contextItems}
                        align="end"
                    />
                </ShowcaseSection>

                <ShowcaseSection title="6. Notifications" description="Items with badge indicators and description metadata.">
                    <Dropdown
                        trigger={
                            <Button variant="outline" size="icon">
                                <Bell className="size-4" />
                            </Button>
                        }
                        items={notifItems}
                        align="center"
                        contentWidth="18rem"
                    />
                </ShowcaseSection>

                <ShowcaseSection title="7. Custom Children" description="Fully custom node injected via 'custom' item type.">
                    <Dropdown
                        trigger={<Button variant="outline" rightIcon={<ChevronDown className="size-4" />}>
                            Workspace
                        </Button>}
                        items={customItems}
                        align="start"
                        contentWidth="16rem"
                    />
                </ShowcaseSection>

                <ShowcaseSection title="8. Security Menu" description="Link items with grouped destructive actions.">
                    <Dropdown
                        trigger={
                            <Button variant="outline" leftIcon={<Shield className="size-4" />} rightIcon={<ChevronDown className="size-4" />}>
                                Security
                            </Button>
                        }
                        items={securityItems}
                        align="start"
                        contentWidth="16rem"
                    />
                </ShowcaseSection>

                <ShowcaseSection title="9. Theme Switcher" description="Radio group inside dropdown for single-select theming.">
                    <ThemeDropdown />
                </ShowcaseSection>

                <ShowcaseSection title="10. classNames Customization" description="All styling tokens overridden via classNames prop without touching the component.">
                    <Dropdown
                        trigger={<Button rightIcon={<ChevronDown className="size-4" />}>
                            Custom Styled
                        </Button>}
                        items={[
                            { type: "label", label: "Options" },
                            { type: "item", label: "Action A", icon: Zap },
                            { type: "item", label: "Action B", icon: Settings },
                            { type: "divider" },
                            { type: "item", label: "Danger", icon: Trash2, destructive: true },
                        ]}
                        align="start"
                        classNames={{
                            content: "border-primary/30 bg-primary/5 backdrop-blur",
                            label: "text-primary font-bold",
                            item: "rounded-md",
                            itemIcon: "text-primary",
                            separator: "bg-primary/20",
                        }}
                    />
                </ShowcaseSection>

                <ShowcaseSection title="11. Help & Support" description="Mixed links, items with HelpCircle icon — support menu pattern.">
                    <Dropdown
                        trigger={
                            <Button variant="ghost" size="icon">
                                <HelpCircle className="size-5" />
                            </Button>
                        }
                        items={[
                            { type: "link", label: "Documentation", href: "/docs", icon: BookOpen },
                            { type: "link", label: "API Reference", href: "/api-ref", icon: FileText },
                            { type: "divider" },
                            { type: "item", label: "Send feedback", icon: MessageSquare },
                            { type: "link", label: "Community", href: "https://github.com", icon: GitCompareArrows, external: true },
                        ]}
                        contentWidth="14rem"
                        align="end"
                    />
                </ShowcaseSection>
            </div>
        </div>
    )
}
