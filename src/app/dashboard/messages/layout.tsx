import type { Metadata } from "next"
import { SectionShell } from "@/features/dashboard/components/section-shell"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = {
    title: "Messages | Dashboard",
    description: "Communicate with staff, students, and parents through direct and group messaging",
}

const TABS = [
    { label: "Chat", value: "chat", href: ROUTES.dashboard.messages.chat },
    { label: "Overview", value: "overview", href: ROUTES.dashboard.messages.overview },
    { label: "Analytics", value: "analytics", href: ROUTES.dashboard.messages.analytics },
]

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <SectionShell tabs={TABS}>
            {children}
        </SectionShell>
    )
}
