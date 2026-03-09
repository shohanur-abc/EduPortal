import Image from 'next/image';
import { Section } from '@/components/section';

// ============= MAIN COMPONENT =============
export default function Partners({ eyebrow, title, subtitle, partners }: IPartners) {
    return (
        <Section containerClass="bg-muted/50" eyebrow={eyebrow} title={title} subtitle={subtitle}>
            <LogosGrid partners={partners} />
        </Section>
    );
}

// ============= CHILD COMPONENTS =============
const LogosGrid = ({ partners }: { partners: IPartner[] }) => (
    <div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 @3xl:grid-cols-6 gap-8">
        {partners.map((partner, i) => (
            <PartnerLogo key={i} {...partner} />
        ))}
    </div>
);

const PartnerLogo = ({ name, logo }: IPartner) => (
    <div className="flex items-center justify-center p-5 rounded-xl border bg-background hover:shadow-sm transition-shadow">
        <div className="h-15 w-full relative grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all">
            <Image
                src={logo}
                alt={name}
                fill
                className="rounded-md"
            />
        </div>
    </div>
);

// ============= TYPES =============
interface IPartner {
    name: string;
    logo: string;
}

interface IPartners {
    eyebrow: string;
    title: string;
    subtitle: string;
    partners: IPartner[];
}
