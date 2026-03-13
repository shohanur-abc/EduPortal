import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { DashboardLayoutClient } from "./layout-client"

export const metadata: Metadata = {
    title: {
        default: "Dashboard | EduPortal ",
        template: "%s | EduPortal ",
    },
    description: "EduPortal dashboard for managing your institution",
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()

    const user = session?.user
        ? {
            name: session.user.name ?? "User",
            email: session.user.email ?? "",
            role: session.user.role ?? "user",
            avatar: session.user.image ?? undefined,
        }
        : null

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

    return <DashboardLayoutClient user={user}>{children}</DashboardLayoutClient>
}
