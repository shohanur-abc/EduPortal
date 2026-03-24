"use client";
import { cn } from "@/lib/utils";
import { Playground } from "./playground";
import { ReactNode } from "react";
import { cva } from "class-variance-authority";
import { Badge } from "./molecules";
import { AnimatedGradientText } from "./ui/animated-gradient-text";

const Comp = ({ title, eyebrow, subtitle, align = "center", className, classNames: cns, containerClass, decorative, children, cols }: CompProps) => (
    <section className={cn("@container relative overflow-hidden", containerClass, cns?.outerContainer)}>
        {decorative}

        <div className={cn("max-w-7xl mx-auto px-4 @2xl:px-8 py-10 @md:py-20", cns?.innerContainer)}>
            {(eyebrow || title || subtitle) && (
                <div className={cn("mb-12 space-y-3", cns?.headingContainer)}>
                    {eyebrow && <Badge variant='ghost' className={cn(eyebrowVariants({ align }), cns?.eyebrow)} ><AnimatedGradientText colorFrom="var(--primary)" colorTo="var(--destructive)">{eyebrow}</AnimatedGradientText></Badge>}
                    {title && <h2 className={cn(titleVariants({ align }), cns?.title)}>{title}</h2>}
                    {subtitle && <p className={cn(subtitleVariants({ align }), cns?.subtitle)}>{subtitle}</p>}
                </div>
            )}
            {cols || className ? (
                <div className={cn(gridVariant({ cols: cols }), className)}>{children}</div>
            ) : children}
        </div>
    </section>
);

export const Section = (props: React.ComponentProps<typeof Comp>) =>
    (process.env.NODE_ENV === 'development' ? <Playground Preview={<Comp {...props} />} /> : <Comp {...props} />);


// ============= VARIANTS =============
const gridVariant = cva("", {
    variants: {
        cols: {
            2: 'grid gap-6 @3xl:gap-10 grid-cols-1 @3xl:grid-cols-2',
            3: 'grid gap-6 @3xl:gap-8 grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3',
            4: 'grid gap-6 grid-cols-1 @lg:grid-cols-2 @5xl:grid-cols-4',
        },
    },
});

const eyebrowVariants = cva("text-sm font-semibold tracking-widest text-primary border-primary/20 block bg-primary/5 uppercase", {
    variants: {
        align: {
            left: "mr-auto",
            center: "mx-auto",
            right: "ml-auto",
        },
    },
});

const titleVariants = cva("text-3xl @lg:text-4xl @4xl:text-5xl font-bold tracking-tight text-foreground", {
    variants: {
        align: {
            left: "text-left",
            center: "text-center",
            right: "text-right",
        },
    },
});

const subtitleVariants = cva("mx-auto text-base text-muted-foreground @lg:text-lg", {
    variants: {
        align: {
            left: "text-left mx-0",
            center: "text-center",
            right: "text-right ml-auto mr-0",
        },
    },
});


// ============= TYPES =============
interface CompProps {
    eyebrow?: ReactNode;
    title?: ReactNode;
    subtitle?: ReactNode;
    decorative?: React.ReactNode;
    align?: "left" | "center" | "right";
    cols?: 2 | 3 | 4;
    className?: string;
    containerClass?: string;
    children: ReactNode;
    classNames?: {
        outerContainer?: string;
        innerContainer?: string;
        headingContainer?: string;
        eyebrow?: string;
        title?: string;
        subtitle?: string;
    }
}

