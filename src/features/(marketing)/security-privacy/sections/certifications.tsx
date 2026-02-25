import { type LucideIcon, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';

// ============= MAIN COMPONENT =============
export default function Certifications({ eyebrow, title, subtitle, certifications }: ICertifications) {
    return (
        /* Using @container for precise grid and typography scaling.
           Added a subtle background tint for a professional look.
        */
        <Section className="px-4 py-16 md:py-24 @container overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12 @3xl:space-y-16">
                {/* Section Heading with central alignment */}
                <div className="text-center">
                    <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
                </div>
                
                <Grid certifications={certifications} />
            </div>
        </Section>
    );
}

// ============= CHILD COMPONENTS =============

const Grid = ({ certifications }: { certifications: ICertificationItem[] }) => (
    /* Responsive Grid Logic:
       - Default: 1 column
       - @md/sm: 2 columns
       - @3xl: 3 columns
       - @5xl/7xl: 4 columns
    */
    <div className="grid grid-cols-1 @sm:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4 gap-6 @xl:gap-8">
        {certifications.map((cert, i) => (
            <CertificationCard key={i} {...cert} />
        ))}
    </div>
);

const CertificationCard = ({ icon: Icon, name, status, description }: ICertificationItem) => (
    /* Card with glass-morphism hints and premium hover states */
    <Card className="group relative flex flex-col h-full bg-background/60 backdrop-blur-sm border-border/50 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden text-center">
        {/* Decorative background element on hover */}
        <div className="absolute top-0 right-0 size-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors duration-500" />
        
        <CardHeader className="items-center space-y-4 pt-8">
            <IconBox icon={Icon} />
            <div className="space-y-2">
                <CardTitle className="text-lg @xl:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {name}
                </CardTitle>
                <StatusBadge status={status} />
            </div>
        </CardHeader>
        
        <CardContent className="pb-8">
            <p className="text-sm @xl:text-base text-muted-foreground leading-relaxed">
                {description}
            </p>
        </CardContent>
    </Card>
);

const IconBox = ({ icon: Icon }: { icon: LucideIcon }) => (
    /* Icon wrapper with a soft glow and bounce effect on parent hover */
    <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center relative z-10 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300">
            <Icon className="size-8" />
        </div>
    </div>
);

const StatusBadge = ({ status }: { status: string }) => (
    /* Badge with refined spacing and bold text */
    <Badge variant="secondary" className="px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-primary/5 text-primary border-primary/10">
        {status}
    </Badge>
);

// ============= TYPES =============
interface ICertificationItem {
    icon: LucideIcon;
    name: string;
    status: string;
    description: string;
}

interface ICertifications {
    eyebrow: string;
    title: string;
    subtitle: string;
    certifications: ICertificationItem[];
}