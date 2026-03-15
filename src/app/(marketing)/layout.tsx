import { Meteors } from "@/components/ui/meteors";
import { auth } from "@/lib/auth";
import LayoutClient from "./layout-client";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    const user = session?.user ? {
        name: session.user.name || 'User',
        email: session.user.email || '',
        role: session.user.role || 'user',
        avatar: session.user.image,
    } : undefined;

    return <>
        <main>
            <div className="fixed inset-0 pointer-events-none">
                <Meteors number={10} maxDelay={.5} minDuration={5} maxDuration={10} />
            </div>
            <LayoutClient user={user}>{children}</LayoutClient>
        </main>
    </>;
}