import { Meteors } from "@/components/ui/meteors";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    return <div className="relative h-screen overflow-hidden">
            <Meteors className="z-999" />
            {children}
        </div>;;
}