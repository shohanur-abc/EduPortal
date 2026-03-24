"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ClockIcon } from "@/lib/icon";
import { Button } from "@/components/molecules";
import AuthCard from "../components/auth-card";
import { ROUTES } from "@/lib/routes";
import { logout } from "@/services/auth";

// ============= MAIN COMPONENT =============
export default function SessionTimeoutSection({ header, countdownText, actions }: ISessionTimeoutSection) {
    const [countdown, setCountdown] = useState(60);
    const router = useRouter();

    useEffect(() => {
        if (countdown <= 0) {
            router.push(ROUTES.auth.login);
            return;
        }
        const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
        return () => clearInterval(timer);
    }, [countdown, router]);

    return (
        <AuthCard title={header.title} description={header.description}>
            <div className="space-y-6">
                <TimeoutIcon />
                <CountdownDisplay seconds={countdown} text={countdownText} />
                <Actions labels={actions} />
            </div>
        </AuthCard>
    );
}

// ============= CHILD COMPONENTS =============
const TimeoutIcon = () => (
    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted">
        <ClockIcon className="size-8 text-muted-foreground" />
    </div>
);

const CountdownDisplay = ({ seconds, text }: { seconds: number; text: string }) => (
    <p className="text-center text-sm text-muted-foreground">
        {text}{" "}
        <span className="font-bold text-foreground">{seconds}s</span>
    </p>
);

const Actions = ({ labels }: { labels: ISessionTimeoutSection["actions"] }) => (
    <div className="flex flex-col gap-2">
        <Button asChild className="w-full">
            <a href={ROUTES.auth.login}>{labels.signIn}</a>
        </Button>
        <form action={logout}>
            <Button type="submit" variant="outline" className="w-full">
                {labels.signOut}
            </Button>
        </form>
    </div>
);

// ============= TYPES =============
interface ISessionTimeoutSection {
    header: { title: string; description: string };
    countdownText: string;
    actions: { signIn: string; signOut: string };
}
