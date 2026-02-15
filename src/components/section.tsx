import { cn } from "@/lib/utils";

export const Section = ({ children, className, containerClass, decorative }: { children: React.ReactNode; className?: string; containerClass?: string; decorative?: React.ReactNode }) => (
    <section className={cn("@container relative overflow-hidden", containerClass)}>
        {decorative}
        <div className={cn("max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-20 @md:py-28 @xl:py-36", className)}>
            {children}
        </div>
    </section>
);