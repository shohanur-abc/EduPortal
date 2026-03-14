import { Meteors } from "@/components/ui/meteors";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return <>
        <div className="fixed inset-0 pointer-events-none">
            <Meteors number={10} maxDelay={.5} minDuration={5} maxDuration={10} />
        </div>
        {children}
    </>;
}