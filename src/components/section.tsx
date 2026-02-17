import { cn } from "@/lib/utils";
import { Playground } from "./playground";

const Comp = ({ children, className, containerClass, decorative }: CompProps) => (
    <section className={cn("@container relative overflow-hidden", containerClass)}>
        {decorative}
        <div className={cn("max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-20 @md:py-28", className)}>
            {children}
        </div>
    </section>
);

export const Section = (props: React.ComponentProps<typeof Comp>) =>
    (process.env.NODE_ENV === 'development' ? <Playground Preview={<Comp {...props} />} /> : <Comp {...props} />);



// ============= TYPES =============
interface CompProps extends React.ComponentPropsWithoutRef<'section'> {
    decorative?: React.ReactNode;
    containerClass?: string;
}